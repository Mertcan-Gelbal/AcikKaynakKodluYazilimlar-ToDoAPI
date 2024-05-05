ToDo API README
Bu proje, bir ToDo uygulaması için basit bir Node.js Express API'sini içerir. 
Kullanıcıların kaydolması, giriş yapması, kullanıcıya ait ToDo listesini alması, 
yeni ToDo eklemesi ve ToDo'ları silmesi gibi temel işlevleri gerçekleştirir.

Kullanım
Bu API'yi kullanarak, kullanıcılar ToDo listelerini yönetebilirler.

Endpoints
POST /register: Kullanıcı kaydı oluşturur.
POST /login: Kullanıcı girişi yapar.
GET /todos: Kullanıcıya ait ToDo listesini alır.
POST /addTodo: Yeni bir ToDo ekler.
DELETE /deleteTodos: ToDo'ları siler.

Başlangıç
Projeyi başlatmak için aşağıdaki komutu kullanın:
bash
Copy code
npm start
Sunucu başarıyla başlatıldıktan sonra, 
http://localhost:3001 adresinden API'ye erişebilirsiniz.

Kullanım
API'yi kullanarak kullanıcı kaydı oluşturabilir, giriş yapabilir, 
ToDo listesini alabilir, yeni ToDo ekleyebilir ve ToDo'ları silebilirsiniz.