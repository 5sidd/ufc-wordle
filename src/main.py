from bs4 import BeautifulSoup
import requests
import json


rankings_page = requests.get('https://www.ufc.com/rankings')
soup = BeautifulSoup(rankings_page.content, 'html.parser')

headers = soup.find_all(class_="view-grouping")
weight_classes = []

i = 0
while i < len(headers):
    if (i != 0 and i != 9 and i != 13):
        weight_classes.append(headers[i])
    i = i + 1

scraped_data_mens = []
scraped_data_womens = []


def process_weight_class(weight_class):
    fighters_list = list(weight_class.find_all(class_='views-row'))
    rankings = list(weight_class.find_all(class_='views-field-weight-class-rank'))

    all_fighters = []
    get_champion = weight_class.find('span')
    champion_exists = True

    if get_champion.text == "NR":
        champion_exists = False
        #print("Vacant Champion!")
    
    if champion_exists:
        champion = {
            "fighter": fighters_list[0].get_text(),
            "link": fighters_list[0].find('a')['href'],
            "rank": 0
        }
        all_fighters.append(champion)

    if champion_exists:
        i = 1
        while i < len(fighters_list):
            link = fighters_list[i].find('a')
            fighter_object = {
                "fighter": fighters_list[i].get_text(),
                "link": link['href'],
                "rank": int(rankings[i - 1].get_text())
            }
            all_fighters.append(fighter_object)
            i = i + 1
    else:
        i = 0
        while i < len(fighters_list):
            link = fighters_list[i].find('a')

            fighter_object = {
                "fighter": fighters_list[i].get_text(),
                "link": link['href'],
                "rank": int(rankings[i].get_text())
            }
            all_fighters.append(fighter_object)
            i = i + 1

    weight_class_object = {
        "weightClass": weight_class.find(class_='view-grouping-header').get_text(),
        "fighters": all_fighters
    }

    return weight_class_object

#print(process_weight_class(weight_classes[3]))

def get_attributes(link):
    athlete_page = requests.get('https://www.ufc.com' + link)
    soup2 = BeautifulSoup(athlete_page.content, 'html.parser')
    bio_data_raw = soup2.find_all(class_='c-bio__field')

    age = 0
    height = 0
    reach = 0

    for data in bio_data_raw:
        if (data.find(class_='c-bio__label').get_text() == 'Age'):
            age = int(data.find(class_='c-bio__text').get_text())

        if (data.find(class_='c-bio__label').get_text() == 'Height'):
            height = float(data.find(class_='c-bio__text').get_text())

        if (data.find(class_='c-bio__label').get_text() == 'Reach'):
            reach = float(data.find(class_='c-bio__text').get_text())

    atttributes_object = {
        "age": age,
        "height": height,
        "reach": reach
    }

    return atttributes_object

def update_all():
    i = 1
    for w in weight_classes:
        processed_weight_class = process_weight_class(w)
        weight_class_fighters = processed_weight_class['fighters']

        gender = 0
        weight_class = ''

        if processed_weight_class['weightClass'].split()[0] == "Women's":
            gender = 0
            weight_class = processed_weight_class['weightClass'].split()[1]
        else:
            gender = 1
            weight_class = processed_weight_class['weightClass'].split()[0]

        for f in weight_class_fighters:
            bio_data = get_attributes(f['link'])
            if gender == 0:
                female_fighter = {
                    "id": i,
                    "name": f['fighter'],
                    "weightClass": weight_class,
                    "rank": f['rank'],
                    "age": bio_data['age'],
                    "height": bio_data['height'],
                    "reach": bio_data['reach']
                }
                female_fighter_string = json.dumps(female_fighter)
                loaded_female_fighter = json.loads(female_fighter_string)
                scraped_data_womens.append(loaded_female_fighter)
                i = i + 1
            else:
                if weight_class == "Light":
                    weight_class = "Light Heavyweight"
                male_fighter = {
                    "id": i,
                    "name": f['fighter'],
                    "weightClass": weight_class,
                    "rank": f['rank'],
                    "age": bio_data['age'],
                    "height": bio_data['height'],
                    "reach": bio_data['reach']
                }
                male_fighter_string = json.dumps(male_fighter)
                loaded_male_fighter = json.loads(male_fighter_string)
                scraped_data_mens.append(loaded_male_fighter)
                i = i + 1

    with open('female-fighters.json', 'w') as f:
        f.truncate(0)
        json.dump(scraped_data_womens, f)

    with open('male-fighters.json', 'w') as f:
        f.truncate(0)
        json.dump(scraped_data_mens, f)


if __name__ == "__main__":
    update_all()