# commission-widget

## Tech Stack Justification

### Next.js

Initially I planned to create a pure react app using `create-react-app`, however, eventually I decided against this approach and chose to use Next.js instead for the following reasons:

1. Realism. In Next.js I can easily create API endpoints to simulate the scenario more realistically, whereas in a pure react app, I would either have to convert it to a fullstack app with express or develop and deploy a seperate `express` app. As the requirments specify I should submit a single repository and endpoint, alongside the added complexity to development and deployment, I chose against this approach.
2. Easy to deploy. Next.js is extremely easy to deploy to vercel and I knew this would work without issue, so this was a natural choice.
3. Added functionality. Next.js extends a lot of react with their own components and conventions. I tried to avoid using this as much as possible so the codebase would be as purely react as possible, so it could be copied to a `create-react-app` project without issue. The only real exceptions are the `app` folder strucutre and file based routing, and my occasional use of the Next.js `Image` component.

### Zod

`Zod` is a validation library which focuses on type-safety. While I didn't really need it for this project (as you can see in the `src/actions/commission.ts` file), I chose to include it to demonstrate a more modern approach to validation which is a lot more feature-full.

### Styling

I considered four different apporaches to styling in this project: `TailwindCSS`, `StyleX`, `styled-components` and pure CSS. I would settle on using `styled-components` for the following reasons:

1. I wanted to write CSS. To demonstrate my capacity to write simple and complex CSS patterns, I wanted to actually write CSS syntax and not some other variation like `TailwindCSS` (which uses utililty classes). This knocked out `TailwindCSS`
2. I wanted to use CSS as similar as possible to the OneUp marketing site. I assumed the [OneUp site's](https://oneupsales.com/) styling would be the same as the dashboards, so I investigated to see if I could determine what approach you used there (a lot of the classnames start with `hs-` but I couldn't figure that out). I concluded it was pure CSS (just writing some classes and applying them).
3. I wanted to colocate the CSS with the JS. For simplicity, I didn't want a bunch of specific CSS files. This just added more files and frankly I just didn't want to do it. This knocked out Pure CSS.
4. I didn't want to learn anything new. I've never used `StyleX` before but I have used `styled-components`. Because of the time retraints, I couldn't confidently assume I would be able to figure out `StyleX` and manage to produce a solution. This knocked out `StyleX`.

### Linting and Formatting

Initially, I wasn't going to include a linter or formatter in this project, but after making some rookie mistakes in best practises, I decided to use `biome` which includes both a formatter and linter.

## Other

### Multiple Widgets

In my submission, I chose to include 2 different widget components, one using an API endpoint and the other using a server action to demonstrate my capacity to do both. I also considered including a third variation using a querying library like `react-query` but decided not to.
