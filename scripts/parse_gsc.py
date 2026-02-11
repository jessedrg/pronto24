import csv

# Parse queries
queries = []
with open('/Users/jesse.dragstra/Documents/pronto24/public/Consultas.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        clicks = int(row['Clics']) if row['Clics'] else 0
        impr = int(row['Impresiones']) if row['Impresiones'] else 0
        pos = float(row['Posición']) if row['Posición'] else 0
        queries.append({'q': row['Consultas principales'], 'clicks': clicks, 'impr': impr, 'pos': pos})

# Breakdown by profession
prof_counts = {}
for q in queries:
    for p in ['electricista', 'fontanero', 'cerrajero', 'desatasc', 'caldera']:
        if p in q['q'].lower():
            prof_counts.setdefault(p, {'clicks': 0, 'impr': 0, 'count': 0})
            prof_counts[p]['clicks'] += q['clicks']
            prof_counts[p]['impr'] += q['impr']
            prof_counts[p]['count'] += 1
            break

print('=== BREAKDOWN BY PROFESSION ===')
for p, v in sorted(prof_counts.items(), key=lambda x: x[1]['clicks'], reverse=True):
    print(f"{p}: {v['count']} queries, {v['clicks']} clicks, {v['impr']} impressions")

print()
print('=== TOP 30 QUERIES BY CLICKS ===')
queries.sort(key=lambda x: x['clicks'], reverse=True)
for q in queries[:30]:
    print(f"{q['clicks']}c {q['impr']}i pos{q['pos']:.1f} | {q['q']}")

print()
print('=== TOP 30 QUERIES BY IMPRESSIONS ===')
queries.sort(key=lambda x: x['impr'], reverse=True)
for q in queries[:30]:
    print(f"{q['clicks']}c {q['impr']}i pos{q['pos']:.1f} | {q['q']}")

# Extract cities from queries
print()
print('=== CITIES WITH CLICKS ===')
cities_clicks = {}
cities_impr = {}
for q in queries:
    for p in ['electricista', 'fontanero', 'cerrajero', 'desatascos', 'calderas', 'caldera']:
        if p in q['q'].lower():
            idx = q['q'].lower().find(p) + len(p)
            city = q['q'][idx:].strip().strip('-').strip()
            for mod in ['urgente', '24 horas', 'ahora', 'hoy', 'rapido', 'economico', 'barato', 'cerca de mi', 'profesional', 'a domicilio', '24h', 'de guardia', 'nocturno']:
                city = city.replace(mod, '').strip()
            if city and len(city) > 2:
                city = city.strip('-').strip()
                if q['clicks'] > 0:
                    cities_clicks[city] = cities_clicks.get(city, 0) + q['clicks']
                cities_impr[city] = cities_impr.get(city, 0) + q['impr']
            break

for city, clicks in sorted(cities_clicks.items(), key=lambda x: x[1], reverse=True):
    print(f"{clicks}c {cities_impr.get(city, 0)}i | {city}")

print()
print('=== TOP CITIES BY IMPRESSIONS (>20) ===')
for city, impr in sorted(cities_impr.items(), key=lambda x: x[1], reverse=True)[:50]:
    if impr > 20:
        print(f"{cities_clicks.get(city, 0)}c {impr}i | {city}")

# Parse pages
print()
print('=== TOP 30 PAGES BY CLICKS ===')
pages = []
with open('/Users/jesse.dragstra/Documents/pronto24/public/Páginas.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        clicks = int(row['Clics']) if row['Clics'] else 0
        impr = int(row['Impresiones']) if row['Impresiones'] else 0
        pages.append({'url': row['Páginas principales'], 'clicks': clicks, 'impr': impr})

pages.sort(key=lambda x: x['clicks'], reverse=True)
for p in pages[:30]:
    print(f"{p['clicks']}c {p['impr']}i | {p['url']}")
