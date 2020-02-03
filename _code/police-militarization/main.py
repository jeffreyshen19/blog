import csv

# Aggregate Quantity and Cost by State

stateNames = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

states = {}
populationData = {}
crimeData = {}

with open('population.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    for row in csv_reader:
        for key, value in stateNames.items():
            if row["state"].lower() == value.lower():
                populationData[key] = row["population"]

with open('violent-crime.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    for row in csv_reader:
        for key, value in stateNames.items():
            if row["state"].lower() == value.lower():
                crimeData[key] = row["rate_per_100000_inhabitants"]

with open('1033.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=',')
    for row in csv_reader:
        if row["state"] not in states:
            # TODO: add population, crime rate, and split by type of weapon
            states[row["state"]] = {
                "state-name": stateNames[row["state"]],
                "total-reports": 0,
                "total-quantity": 0,
                "total-cost": 0,
                "population": populationData[row["state"]],
                "violent_crime_rate_per_100000_inhabitants": crimeData[row["state"]],
            }

        states[row["state"]]["total-reports"] += 1
        states[row["state"]]["total-quantity"] += int(row["quantity"])
        states[row["state"]]["total-cost"] += float(row["cost"])

with open("../../data/police-militarization/1033-by-state.csv", 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=["state", "state-name", "total-reports", "total-quantity", "total-cost", "population", "violent_crime_rate_per_100000_inhabitants"])
    writer.writeheader()
    for key, value in states.items():
        value["state"] = key
        writer.writerow(value)
