import csv
import json
import os
from collections import defaultdict

#  0: ICensus year
#  1: Block ID
#  2: Property ID
#  3: Base property ID
#  4: Street address
#  5: CLUE small area
#  6: Trading name
#  7: Industry (ANZSIC4) code
#  8: Industry (ANZSIC4) description
#  9: Seating type
# 10: Number of seats
# 11: Location
with open('cafes.csv', 'rb') as csvfile:
	reader = csv.reader(csvfile)
	rows = [row for row in reader]

# cafes_block[block_4][2015] == 12 ## 12 cafes on block_4 in 2015
cafes_block = defaultdict(lambda : defaultdict(int))
cafes_area = defaultdict(lambda : defaultdict(int))

for row in rows[2:]:
	year = row[0]
	block = row[1]
	area = row[5]
	seats = int(row[10])
	cafes_block[block][year] += seats
	cafes_area[area][year] += seats

# print json.dumps(cafes_area)
# print json.dumps(cafe_details_block)[:500]

if not os.path.exists('output'):
    os.makedirs('output')

with open('output/cafes_block.json', 'w') as outfile:
    json.dump(cafes_block, outfile)
with open('output/cafes_area.json', 'w') as outfile:
    json.dump(cafes_area, outfile)
