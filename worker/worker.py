from redis.commands.search import result
import redis
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import json
from bson.objectid import ObjectId
load_dotenv()

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=os.getenv("REDIS_PORT"),
    decode_responses=True
)

print("Redis Connected")


mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client[os.getenv("DB_NAME")]

tasks_Collection = db["tasks"]

print("MongoDB Connected")


print("Worker started and waiting for tasks")
while True:
    try:
        _, task_data = redis_client.brpop("taskQueue")
        task_json = json.loads(task_data)
        task_id = task_json["taskId"]
        print(task_id)

        task = tasks_Collection.find_one({"_id": ObjectId(task_id)})
        print(task)

        tasks_Collection.update_one(
        {"_id": ObjectId(task_id)},
        {
            "$set": {
                "status": "running"
            },
            "$push": {
                "logs": "Worker started processing"
            }
        }
        )
        input_text = task["inputText"]
        operation = task["operation"]
        result = ""
        if operation == "uppercase":
            result = input_text.upper()
        elif operation == "lowercase":
            result = input_text.lower()
        elif operation == "wordcount":
            result = str(len(input_text.split()))
        elif operation == "reverse":
            result = input_text[::-1]
        else:
            raise Exception("Invalid operation")
        tasks_Collection.update_one(
        {"_id": ObjectId(task_id)},
        {
            "$set": {
                "status": "success",
                "result": result
            },
            "$push": {
                "logs": "Task completed successfully"
            }
        }
        )
    except Exception as e:
        tasks_Collection.update_one(
        {"_id": ObjectId(task_id)},
        {
            "$set": {
                "status": "failed"
            },
            "$push": {
                "logs": f"Error: {str(e)}"
            }
        }
)


