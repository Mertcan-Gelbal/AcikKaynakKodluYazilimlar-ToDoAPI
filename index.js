const express = require('express');
const md5 = require('md5');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Kullanıcılar JSON dosyası
const usersFilePath = 'users.json';
let usersData = [];
const todosFilePath = 'todos.json';
let todosData = [];

// Verileri dosyadan yükle
function loadUsers() {
    try {
        usersData = JSON.parse(fs.readFileSync(usersFilePath));
    } catch (error) {
        console.error('Kullanıcı verileri yüklenemedi:', error);
        usersData = [];
    }
}
function loadTodo() {
    try {
        todosData = JSON.parse(fs.readFileSync(todosFilePath));
    } catch (error) {
        console.error('Kullanıcı verileri yüklenemedi:', error);
        todosData = [];
    }
}


// Verileri dosyaya kaydet
function saveUsers() {
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 4));
}
function saveTodos() {
    fs.writeFileSync(todosFilePath, JSON.stringify(todosData, null, 4));
}

// Kullanıcı kaydı oluşturma
app.post('/register', async (req, res) => {
    let { username, password } = req.body;
    try {
        password = md5(password);
        loadUsers();
        if (usersData.some(user => user.username === username)) {
            return res.status(400).send('Kullanıcı adı zaten kullanılıyor.');
        }
        usersData.push({ username, password });
        saveUsers();
        res.status(201).send('Kullanıcı kaydı oluşturuldu.');
    } catch (error) {
        console.error('Kullanıcı kaydı hatası:', error);
        res.status(500).send('Kullanıcı kaydı oluşturulamadı.');
    }
});

// Kullanıcı girişi
app.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        password = md5(password);
        loadUsers();
        const user = usersData.find(user => user.username === username && user.password === password);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(401).send('Kullanıcı adı veya şifre yanlış.');
        }
    } catch (error) {
        console.error('Giriş hatası:', error);
        res.status(500).send('Giriş yapılamadı.');
    }
});


//todo listesi
app.get('/todos', (req, res) => {
    try {
        var { username } = req.body;
        if (username)
            {
                loadTodo()
                // Kullanıcının görevlerini filtrele
                const userTodos = todosData.filter(item => item.username === username);
                // Sonucu gönder
                res.status(200).json(userTodos);
            }
        else
            return res.status(400).send('Kullanıcı bilgisi eksik');

        
    } catch (error) {
        console.error('Todo listesi hatası:', error);
        res.status(500).send('Todo listesi alınamadı.');
    }
});
app.post("/addTodo",(req,res)=>{
    let { username, text } = req.body;
    try {
        loadUsers();
        let data = { 
            username:username,
            text:text,
            isCompleted: false,
        }
        todosData.push(data);
        saveTodos();
        res.status(201).send('Yeni todo kaydı oluşturuldu.');
    } catch (error) {
        console.error('Todo kaydı hatası:', error);
        res.status(500).send('Todo kaydı oluşturulamadı.');
    }
});
app.delete("/deleteTodos",(req,res)=>{
    let { username, text } = req.body;
    try {
        loadTodo()
        // Kullanıcının görevlerini filtrele
        const data = todosData.filter(item => !(item.username === username && item.text === text));
        todosData = data;
        saveTodos();
        res.status(201).send('Todo kaydı silinidi.');
        // Sonucu gönder
    } catch (error) {
        console.error('Todo kaydı hatası:', error);
        res.status(500).send('Todo kaydı silinemedi.');
    }
});
// Kullanıcı verilerini yükle
loadUsers();

// Bağlantıyı başlat
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});
