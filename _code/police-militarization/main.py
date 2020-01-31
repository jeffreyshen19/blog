import csv

# Aggregate Quantity and Cost by State

states = {}

with open('1033.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    for row in csv_reader:
        if row["state"] not in states:
            # TODO: add population, crime rate, and split by type of weapon
            states[row["state"]] = {
                "total-reports": 0,
                "total-quantity": 0,
                "total-cost": 0
            }

        states[row["state"]]["total-reports"] += 1
        states[row["state"]]["total-quantity"] += int(row["quantity"])
        states[row["state"]]["total-cost"] += float(row["cost"])

with open("../../data/police-militarization/1033-by-state.csv", 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=["state", "total-reports", "total-quantity", "total-cost"])
    writer.writeheader()
    for key, value in states.items():
        value["state"] = key
        writer.writerow(value)
