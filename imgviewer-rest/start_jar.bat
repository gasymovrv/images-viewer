:: ���� ����������� ������ ���� � ��������� "Cyrillic (Windows 1251)"
:: ����� ��������� ������������ ��������� ����� ��������� 
:: � ������� ��� ������ ������ ���� "Lucida Console"
chcp 1251
set CMD_LINE_ARGS=%1
@call java -jar target/imgviewer-rest-1.0-SNAPSHOT.jar %CMD_LINE_ARGS%
pause