:: ���� ����������� ������ ���� � ��������� "Cyrillic (Windows 1251)"
:: ����� ��������� ������������ ��������� ����� ��������� 
:: � ������� ��� ������ ������ ���� "Lucida Console"
chcp 1251
@cd imgviewer-rest
start start_jar.bat "D:\background"
@cd ../imgviewer-front/public
start "" "index.html"