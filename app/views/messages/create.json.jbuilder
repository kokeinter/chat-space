json.content @message.content
json.image @message.image
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.group_id @message.group.id
json.user_id @message.user.id
json.user_name @message.user.name