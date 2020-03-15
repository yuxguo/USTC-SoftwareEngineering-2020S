# django_lab

Author: YuxuanGuo

## Database

- Mysql (Default). You can modify the database configure in `api_lab/api_lab/settings.py`

## run server

- `mysql -uroot -ppassword`
- `create database apidb`
- `cd api_lab && python manage.py makemigration && python manage.py migrate`
- `python manage.py runserver 8000`

