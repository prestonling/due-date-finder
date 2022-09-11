"""
import pdfplumber

syllabus = ""
with pdfplumber.open(r'Syllabus_MGTSC405_F2022_08Sep2022.pdf') as pdf:
    for page in pdf.pages:
        syllabus += page.extract_text()

print(syllabus)

"""
from time import strftime
from tabula import read_pdf
from tabulate import  tabulate
from dateutil.parser import parse
import csv
from dateutil.parser import parse
from icalendar import Calendar, Event, vCalAddress, vText
import pytz
from datetime import datetime
import os
from pathlib import Path
import camelot

filename = "uploads/Syllabus_MGTSC405_F2022_08Sep2022.pdf"
dirname = os.path.dirname(__file__)
filepath = os.path.join(dirname, filename)
df = read_pdf(
    filepath, pages="all", encoding='mac_roman'
)

#for table in df:
 #   print(table)
    #table.to_csv("Table.csv", encoding='utf-8', index=False)

table = df[0].values.tolist()

print(table)


date_string = table[0][1]



year = str(2022)

print("date_string =", date_string)
print("type of date_string =", type(date_string))

cal = Calendar()

for i in range(len(table)-1): 
    event = Event()
    event.add('summary', table[i][0])
    date_string = table[i][1]
    date_string = year + ", " +date_string
    the_date = datetime.strptime(date_string, "%Y, %B %d")
    print(the_date)
    event.add('dtstart', the_date)   # YYYY,MM,DD
    cal.add_component(event)

directory = str(Path(__file__).parent.parent) + "/"
print("ics file will be generated at ", directory)
f = open(os.path.join(directory, 'example.ics'), 'wb')
f.write(cal.to_ical())
f.close()
