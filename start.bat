:: файл обязательно должен быть в кодировке "Cyrillic (Windows 1251)"
:: иначе параметры передаваемые программе будут нечитаемы 
:: В консоле тип шрифта должен быть "Lucida Console"
chcp 1251
@cd imgviewer-rest
start start_jar.bat "D:\background"
@cd ../imgviewer-front/public
start "" "index.html"