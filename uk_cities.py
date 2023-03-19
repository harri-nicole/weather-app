import csv
import json

cities = []

with open('cities1000.txt', 'r', encoding='utf-8') as f:
    reader = csv.reader(f, delimiter='\t')
    for row in reader:
        if row[8] == 'GB':
            cities.append(row[1])

with open('uk_cities.json', 'w', encoding='utf-8') as f:
    json.dump(cities, f, ensure_ascii=False, indent=2)