A simple travel planning tool

## Installation
``

## Usage


## Motivation
Recently I was planning a trip to Taiwan. It would be my first international trip as an adult — my first time planning a trip from start to finish on my own, but I had no idea where to start. 

I started out by using Notion — I made a table with columns corresponding to activity, date, location, notes, and cost, filling them in the order the activities would take place:

{image goes here}

I quickly realized that this system was not meeting my needs. I wanted to be able to rearrange my itinerary, but I was also worried about losing information in the process. For example, if I want to visit a certain museum, but it’s closed on Mondays, I decide to put it in my table on a Tuesday afternoon. However, what if later I decide I need to shift stuff around, and mindlessly put that museum visit on a Monday, forgetting that it’s in fact closed?

I searched around for an alternative, but came up with nothing. What I wanted, in essence, was some tool I could use to intuitively plan and rearrange my travel plans, while also eliminating the need for me to remember too many moving parts. I’d like for each constraint on an activity, whether it be open times or days, weather limitations, reservation times, etc, to be included in the event on the itinerary, so if I attempt to move it to an impossible time, I can’t. Even better would be a tool that intelligently adapts to my trip *during the trip* — if my flight it delayed, it would alleviate a lot of my stress if my itinerary could rearrange itself to accommodate my delayed flight. It’s raining the day I was supposed to go to a famous garden, but later in the week I planned to visit the museum? This tool would know to swap them!

One thing I noticed when trying out other travel planning tools was that the responsibility was on the user to make sure the itinerary made sense. The tool said nothing when I entered in breakfast in Tokyo and dinner in Paris. Similarly, many of these tools have an “AI assistant feature” — essentially a wrapper around chat gpt where you can ask for suggestions (for an additional fee), when I could just open chat gpt in a new window. This tool actually incorporates AI in a meaningful way to help you plan a smarter trip. Building on this, why can’t this tool fill in blank spaces in your itinerary? Maybe you’ve filled up the itinerary with everything you want to see and do, but still have free time? No problem — this tool can recommend activities based on what others with similar itineraries have chosen.

Wanted to learn and practice svelte
Practice making a very interactive webpage
Potential application for AI in the future

## Tech
- TypeScript + Svelte
- Vite
