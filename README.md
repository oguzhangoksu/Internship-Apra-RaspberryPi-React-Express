# CihazTarama


Raspbbery+Server dosyanın içindeki app.js Raspberry Pi'nin içine atılmalıdır

Frontend ve Raspbbery+Server dosyları indirmeniz yeterlidir


Server ip adresini Raspberry Pi'ye axios-express yoluyla gitmektedir.Raspbbery Pi'de olan socket.io ile server socket.io arasında bağlatı kurup bilgilerini bu bağlantıyla aktarır.Aktarılan bağlantilar server kısmında direk React'a giderken, aynı zamanda bu bilgiler MYSQL'e aktarılmaktadır.
