def is_date(string, fuzzy=False):
    """
    This is not my function. found this code here : https://stackoverflow.com/questions/25341945/check-if-string-has-date-any-format
    Return whether the string can be interpreted as a date.

    :param string: str, string to check for date
    :param fuzzy: bool, ignore unknown tokens in string if True
    """
    try: 
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False
from lib2to3.pgen2.parse import ParseError
from time import strftime
from tabula import read_pdf
from tabulate import  tabulate
from dateutil.parser import parse
import csv
from dateutil import parser

from dateutil.parser import parse
from icalendar import Calendar, Event, vCalAddress, vText
import pytz
from datetime import datetime
import os
from pathlib import Path
import camelot
from dateutil.parser import parse

def convert(filename):
    #filepath = r"C:\Users\dhana\Documents\Hackathon\Syllabus_MGTSC405_F2022_08Sep2022.pdf"
    dirname = os.path.dirname(__file__)
    uploads_path = os.path.join(dirname, "uploads")
    filepath = os.path.join(dirname, "uploads", filename )
    df = read_pdf(
        filepath, pages="all", encoding='mac_roman'
    )

    cal = Calendar()

    table_index = -1
    date_index = -1
    other_index = -1
    for tables in df:
        tables = tables.values.tolist()
        for rows in tables:
            for entries in rows:
                try:   
                    if is_date(entries):
                        
                        #table_index = df.index('tables')
                        date_index = rows.index(entries)
                        event = Event()
                        summary_index = 1 - date_index
                        summary = rows[summary_index]
                        date = parser.parse(rows[date_index])
                        event.add('summary',summary)
                        event.add('dtstart', date)   
                        print(date)
                        cal.add_component(event)

                except TypeError:
                    continue
      
    directory = str(Path(__file__).parent.parent) + "/"
    print("ics file will be generated at ", directory)
    new_filename = os.path.splitext(filename)[0]
    f = open(os.path.join(uploads_path, new_filename+".ics"), 'wb')
    f.write(cal.to_ical())
    f.close()        
