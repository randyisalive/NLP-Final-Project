import time
import sys


def loading_spinner():
    spinner = ["|", "/", "-", "\\"]
    for i in range(20):  # Adjust the range for desired duration
        sys.stdout.write("\rLoading... " + spinner[i % len(spinner)])
        sys.stdout.flush()
        time.sleep(0.1)  # Delay between frames
    sys.stdout.write("\rLoading... Done!     \n")  # Final message
