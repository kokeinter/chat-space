# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



## usersテーブル

|column|type|options|
|------|----|-------|
|name|string|null:false|
|email|string|null:false|
|password|string|null:false|

### アソシエーション
- has_many :users_groups
- has_many :groups, through: :users_groups
- has_many :messages,depenent: :delete_all


## groupsテーブル
|column|type|options|
|------|----|-------|
|name|string|null:false|
|user_id|integer|foreign_key:true,null:false|
### アソシエーション
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :messages,depenent: :delete_all


## messagesテーブル
|column|type|options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|foreign_key:true,null:false|
|user_id|integer|foreign_key:true,null:false|

### アソシエーション
- belongs_to:user
- belongs_to:group

## users_groupsテーブル
|column|type|options|
|------|----|-------|
|user_id|integer|foreign_key:true, null: false|
|group_id|integer|foreign_key:true, null: false|
belongs_to :user
belongs_to :group









