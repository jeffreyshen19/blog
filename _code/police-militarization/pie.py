import csv
import get_category

# Pull data for pie chart

categories = {
    "grenade-launchers": {
        "cost": 0,
        "quantity": 0,
    },
    "night-vision": {
        "cost": 0,
        "quantity": 0,
    },
    "assault-rifles": {
        "cost": 0,
        "quantity": 0,
    },
    "armored-vehicles" : {
        "cost": 0,
        "quantity": 0,
    },
    "aircraft": {
        "cost": 0,
        "quantity": 0,
    },
    "body-armor": {
        "cost": 0,
        "quantity": 0,
    },
    "other": {
        "cost": 0,
        "quantity": 0,
    },
}

with open('1033.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    for row in csv_reader:
        # Add category breakdown
        category = get_category.get_category(row["item-name"])
        categories[category]["cost"] += float(row["cost"])
        categories[category]["quantity"] += int(row["quantity"])

fieldnames = ["category", "quantity", "cost"]
with open("../../data/police-militarization/1033-by-category.csv", 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for key, value in categories.items():
        value["category"] = key
        writer.writerow(value)
