import csv

# Aggregate Date by Time Interval for the Line Chart

normalize_data = {}
with open('us-violent-crime.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    for row in csv_reader:
        normalize_data[row["year"]] = {
            "population": int(row["population"]),
            "violent-crime-rate": float(row["violent-crime-rate"]),
        }

dates = {

}

with open('1033.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    for row in csv_reader:
        date = row["ship-date"].split("-")
        month = date[1]
        day = date[2]
        year = date[0]

        if int(year) >= 1996:
            if year not in dates:
                dates[year] = {

                }

            if month not in dates[year]:
                dates[year][month] = {
                    "total-quantity": 0,
                    "total-cost": 0,
                    "population": normalize_data[year]["population"],
                    "violent-crime-rate": normalize_data[year]["violent-crime-rate"],
                }

            dates[year][month]["total-quantity"] += int(row["quantity"])
            dates[year][month]["total-cost"] += float(row["cost"])

with open("../../data/police-militarization/1033-by-time.csv", 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=["date", "total-quantity", "total-cost", "population", "violent-crime-rate", "total-quantity-norm-population", "total-quantity-norm-violent-crime-rate", "total-cost-norm-population", "total-cost-norm-violent-crime-rate"])
    writer.writeheader()

    for year in sorted(dates.keys()):
        for month in sorted(dates[year].keys()):
            values = dates[year][month]
            values["date"] = month + "/" + year
            values["total-quantity-norm-population"] = values["total-quantity"] / values["population"]
            values["total-quantity-norm-violent-crime-rate"] = values["total-quantity"] / values["violent-crime-rate"]
            values["total-cost-norm-population"] = values["total-cost"] / values["population"]
            values["total-cost-norm-violent-crime-rate"] = values["total-cost"] / values["violent-crime-rate"]
            writer.writerow(values)
