
# AI Topic Explorer

## Get Started

This is a React Next.js project. I use `Biome` for linting and formatting. Install that in VSCode if you haven't already.

You can start the project by running:

```bash
yarn dev
```

You will need an `env.local` with a `NEXT_PUBLIC_OPENAI_API_KEY`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Foreword

This is my interpretation of the task given to me by Misfits & Machines.

This task was simple yet weighty and I didn't want leverage AI to generate the entire project, as it wouldn't be a true representation of what you'd be evaluating me for. There are some things I skipped so I could deliver this in the time frame I wanted. Good UI takes experimentation, iteration, and time.

 In digital product MVP-fashion and the interest of time and a deeper focus on my UI dev skillset, I've deviated from some of the original requirements, as only 30% was evaluating design. However, it is still the same end-result in spirit, but with a much heavier focus on the UI, interaction, animation, etc.

There wasn't a true UX process involved in the task. No wire-framing or testing, etc.

## What is this?

This is a Topic Browser, where you can input a topic and get a summary, as well as a list of sections that you can expand to see more details. It is not intended to be a chatbot or a code helper, but a brief summarizer of a topic.

## What code was AI-generated?

I used AI to help generate the AI service `apiClient.ts`, the `useAIResponse` hook, and the entries in `topics.ts`. Not expressly AI, but text editor autocomplete was used for menial syntax.

## What code was not AI-generated?

All the UI pieces, animations, interactions, and logic are my own.

## AI integration

The prompt doesn't deviate from returning the JSON that was required from the doc and has some nice additions:

- The prompt includes some context that condenses the response so the UI is less verbose, cleaner, and more readable.
- The prompt also generates a color palette to be used in the UI for each unique topic.

## Design Decisions

I went with some neuemorphism because it's a decent representation of flat UI with chunkiness; it demonstrates some of the more fun parts of CSS. I did a lot of morphing transitions with the UI because it helps tie visual concepts together and communicate different states and relationships.

I used AI to set the colors for the summary cards, informed by the prompt. IT'S NOT ALWAYS PERFECT—You could get a bad color combo but it works most of the time :D

I took a note from Apple Intelligence with the glowing ring around the text box when you type stuff in. A fun challenge for me, as I've never used a conical gradient before in CSS. It was fun!

## Things I deviated from

Because my interpretation of the task was to focus on the UI, I deviated from the following requirements:

- Displaying code blocks and interpreting markdown (for the purpose of my interpretation, there was no need)
- Using Context or Redux (not needed, state is really simple here)
- Material UI (I built all my own UI rather than using a library)

### What I would expect to do next with more time

- Error display
- Copy to clipboard
- Refactor ResponseView to handle entry expand/collapse at a component level rather than an array state level.
- Further responsive work (Currently using grid autofill and some fluid flex without the addition of media-queries)
- Optimize CSS animations (unmounting exits, mounting entries, `will-change`, and specific properties changed in `transition`)
