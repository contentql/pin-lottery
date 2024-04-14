# Ticket Purchase System

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/efc8c48c55cb4b5cbaea7c1f904fa1c8)](https://app.codacy.com/gh/contentql/pin-lottery?utm_source=github.com&utm_medium=referral&utm_content=contentql/pin-lottery&utm_campaign=Badge_Grade)

## Ticket Details Page

### Adding Extra Tickets

- Users can increase the number of tickets for a contest by clicking on the
  following options:
  - +5 Tickets
  - +10 Tickets
  - +15 Tickets
  - +20 Tickets
- The system will add extra tickets while considering the tickets limit set for
  the contest.

### Quick Picks

- Users can opt for quick picks by clicking on the following options:
  - 3 Quick Picks For $14.97
  - 5 Quick Picks For $24.95
  - 10 Quick Picks For $49.9
  - 20 Quick Picks For $99.8
- Choosing quick picks will add tickets without considering the tickets limit.
  Previous tickets will be replaced.

## Cart Page

### Adding Tickets

- Users can add tickets for different contests to the cart.
- If a user adds tickets for the same contest multiple times, the cart will
  display multiple stacked cards for that contest.
- Each stacked card will have a separate price tag reflecting the total price
  for the tickets added in that instance.

# Developer Config

## Theme Setting

1. Copy the `themes` folder to your `src` folder
2. Install the `Inter` font. `yarn add @fontsource-variable/inter`
3. update the `buildConfig.admin` object with the new style key and value
   `css: path.resolve(__dirname, 'themes/cql/index.scss'),`
