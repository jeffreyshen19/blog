import csv

# Aggregate Date by Time Interval for the Line Chart

dates = {

}

with open('1033.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    for row in csv_reader:
        date = row["ship-date"].split("-")
        month = date[1]
        day = date[2]
        year = date[0]

        if year not in dates:
            dates[year] = {

            }

        if month not in dates[year]:
            dates[year][month] = {
                "total-quantity": 0,
                "total-cost": 0
            }

        dates[year][month]["total-quantity"] += int(row["quantity"])
        dates[year][month]["total-cost"] += float(row["cost"])

with open("../../data/police-militarization/1033-by-time.csv", 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=["date", "total-quantity", "total-cost"])
    writer.writeheader()

    for year in sorted(dates.keys()):
        for month in sorted(dates[year].keys()):
            values = dates[year][month]
            values["date"] = month + "/" + year
            writer.writerow(values)
