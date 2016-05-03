import json
import os
import csv
from collections import OrderedDict

with open('blocks.geojson') as blocks_file:
    blocks = json.load(blocks_file, object_pairs_hook=OrderedDict)


features = blocks['features']
for feature in features:
	geometry = feature['geometry']
	del feature['geometry']
	feature['id'] = feature['properties']['block_id']
	feature['geometry'] = geometry
	del feature['properties']

#print json.dumps(blocks, sort_keys=False)[:10000]

if not os.path.exists('output'):
    os.makedirs('output')
with open('output/blocks.geojson', 'w') as outfile:
    json.dump(blocks, outfile, sort_keys=False)

#### data integrity check
geojson_ids = set([feature['id'] for feature in features])

with open('cafes.csv') as csvfile:
	reader = csv.reader(csvfile)
	csv_ids = set([row[1] for row in reader])

print "GEOJSON ids:", json.dumps(sorted(geojson_ids))[:200]
print "CSV     ids:", json.dumps(sorted(csv_ids))[:200]

print "geo - csv", json.dumps(sorted(geojson_ids - csv_ids))
print "csv - geo", json.dumps(sorted(csv_ids - geojson_ids))