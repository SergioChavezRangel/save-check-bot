
import subprocess
from datetime import timedelta, datetime


# Press ⌃R to execute it.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press ⌘F8 to toggle the breakpoint.


def get_business_days(start_date, end_date):
    # generating dates
    total_elapsed_days = (end_date - start_date).days
    dates = (start_date + timedelta(idx + 1)
             for idx in range(total_elapsed_days))

    # summing all weekdays
    res = sum(1 for day in dates if day.weekday() < 5)

    return res, total_elapsed_days


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    p = subprocess.Popen(
        ['node', 'src/automation/save-check.js'], stdout=subprocess.PIPE)
    out = p.stdout.read()
    print(out)
    startDate = datetime(2023, 6, 28)
    business_days, elapsed_days = get_business_days(startDate, datetime.now())
    print("Total business days since " + startDate.strftime("%m/%d/%Y") + " (" + str(elapsed_days) + "): " + str(business_days))

