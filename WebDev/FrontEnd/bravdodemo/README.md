# Bravado Health Demo Application

## Information
This was a demo applicaiton created for Brvado Health as a programming exercise. There were two parts to this exercise; a "My Appointments" part and a "My Medications" portion. I have opted to focus on the Login to "My Appointments" due to the lack of time to implement everything.

## My Appointments page
The "My Appointments" will consist of:
1. A table that shows a list of at least 3 Appointments saved
    1. The heading for the table must have: Date of Appointment, Time, Location, With Whome, and Notes.
    2. I am opting out to include the ability to sort the: Date of Appointment, Time,  Location, amd With Whome.
    3. I am also opting to a button group, one to Edit and one to Delete (for usability purposes for the user).
2. Edit feature allows the user to:
    1. Edit the selected Appointment 
        1. This includes the: Date, Time, Location, and Who the user is seeing
        2. Also will allow the user to Delete the Appointment
3. The New Appointment button, and feature, will be the same as the Edit feature.
4. There will also be Modal links for each of the Locations and Notes, again, a design decision for the user's ease of use.

## Technologies/Methodologies
This application will use:
- ReactJS (16.8+ for Hooks functionality)
- Redux for State management
- SASS 
    - And in an ATOM Design Principle manner
    - And I used Prepros to compile the SASS files into a CSS file (see root.scss to see how)
- Leaflet API for the Location features (because it's open source, smaller, and I don't have to sign on for any keys to use)
- JSON files for the list of Appointments 
- React-Router-Dom for Routing
- MomentJS for Time/Date translation/manipulation

## Also Included
Since I needed to know how I wanted the page to look, I also chose to do some design work. The work was done via Balsamiq mock-ups. I used a color picker to choose two colors from Bravado Health's logo, a red color and a blue color. I also created two monochromatic lighter colors from these colors (as accompanying colors) for the demo application. 

