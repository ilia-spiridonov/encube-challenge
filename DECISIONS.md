# DECISIONS.md

Here's what I want to build.
I will try to document the key tech/product decisions here.

## Tech stack

- Going with TypeScript and React as requested
  - Using React Hooks only for limited state management, Redux Toolkit takes the rest, read on that below
- Styling with Tailwind whenever possible, using CSS modules for the rest, and Radix for nice out-of-the-box headless UI components
- No time for automated testing, therefore no tests, but:
  - If I had time, I would cover at least all state management (see below for more on that) with Vitest
  - TSC and ESLint configs were made very strict to partially compensate
- Using Vite to build the app, the default bundler choice in 2026
- Vibing some UI parts (especially the commenting feature) with Claude Code to go faster
- Going for Prettier and many stylistic ESLint rules to force AI to produce readable consistent code
- Maybe something else, will mention below

## Canvas model

First, we say that there's the "world", an infinite (not in practice of course) 2D space, in which all canvas "items" are located.
Their location is given by a single pixel point `(x, y)` aka "world position", determining the position of their topmost leftmost pixel.

Once an item is placed in this space, its location does not change (unless the user relocates it manually) - it ignores zooming, panning, and other operations.

To achieve zooming, we conceptually introduce a mapped space, let's call it the "camera" space,
where everything is scaled by `z` (the zoom factor, set to 1 by default).

Next, to enable panning, we introduce the idea of the "camera" - the user is looking at the camera space through it.
For simplicity now, we assume that the size of the camera is always equal to the size of the browser viewport.
Therefore, we only need a single point to define it - the top-left point in the space from which the camera's box originates.

Putting everything together, to render an item on the screen, we need to simply:

- Take it from the normal flow inside the canvas container, give it `position: absolute; left: 0; top: 0;`
- Translate it via a transform: `transform: translate(item.worldX * zoomLevel - cameraX, item.worldY * zoomLevel - cameraY);`
- Scale it: `transform: scale(zoomLevel); transform-origin: top left;`

With that, let's actually implement zooming and panning.

Panning is easy: measure how much the user has dragged their pointer, then just subtract deltaX/deltaY from cameraX/cameraY.

Zooming is trickier: besides updating zoomLevel itself, we need to adjust the camera position to make it look like the user
is zooming "into a point" (which is usually where their pointer is), as opposed to just having all items kind of "slide off" during zooming.

To do this, we recover the world position and then recompute the new camera position, like this:

```ts
// Maintain worldX * newZoomLevel - newCameraX = zoomOriginX
worldX = (zoomOriginX + cameraX) / zoomLevel;
newCameraX = worldX * newZoomLevel - zoomOriginX;
// Same for y...
```

And let's also clamp the zoom level between 25% and 400% to keep it reasonable.

Here are some UX things that I scoped out because of limited time,
but I think they do matter (and their lack makes the experience worse):

- Not supporting pinch zooming - wheel zooming is of course supported, and that's what trackpads on Macs imitate when you pinch, so that works
- Not supporting gesture panning (i.e. when swiping with two fingers)
- No serious accessibility considerations were made (you can tab through everything, but screen-reading won't work)
- To pan, you first need to select the panning mode in the top bar - no hotkeys, not great

Tech things I decided to not look into or implement because I'm heavily time-constrained:

- Not storing items in LocalStorage, and obviously there's no backend
- Not hiding any off-camera items - no tiling, no algorithms to find visible items (2D binary search?), etc. - currently everything is always rendered
- Not experimenting with `<canvas>` or any other non-obvious rendering ideas
- While the implementation should be completely cross-browser, I only tested in Chromiums on desktop

## State management

Even though all-state-in-React-hooks would be faster to code, this kind of approach will realistically fail quickly,
so I'm bringing proper Redux Toolkit in from the start.

I want to express all changes to the canvas and the camera as serializable immutable actions (aka commands).
With that, we're kind of doing event sourcing.

My motivation:

- Makes it possible to implement undo / history - just store a stack of applied actions in the store
- Pass sequences of these actions to the server for conflict resolution
- Offline work - buffer actions while disconnected, then replay to the server
- Can implement features like proper following of users - just resend camera-related actions through the server and dispatch on clients
- Much easier debugging (time travel!), including in production, and automated testing of complex interactions

## Comments implementation

A comment is simply just another kind of a canvas item (the other supported kind is "colored box", but such items are all hardcoded, you can't create them from UI).
With that said, a comment's state is not actually stored inside an item - only a reference ID to it is stored.
This should keep the actual canvas implementation cleaner and easier to extend with more item kinds.

The data model is going to be slightly non-trivial because nested comments (threads) are requested:

- Each comment holds a reference to its parent, set to `null` for top-level comments
- The comments store is organized in a way that enables fast lookup of all child comments
- The store is normalized to enable easy implementation of editing

To quickly get properly working UI components that I need for this feature, like popovers and dialogs, I will use Radix UI.
It should pair very well with both Tailwind and agentic coding.

Let's also make the following product decisions to meet the requirements (but save time):

- To add a comment, the user first needs to select the commenting interaction mode in the top bar, no shortcut, not great
- Let's ask for a name every time somebody leaves a comment, to ensure that every comment has an author name
- To simplify UX and implementation, limit comment nesting to just one level - there are top-level comments and they can have replies, that's it
- Let's make it possible to resolve/unresolve a comment at any time, regardless of having replies - but provide a shortcut button "Reply and resolve", GitLab-style, for better UX
- Decide that replies cannot have a resolution status, because it's unclear what this would mean
- For showing all comments in the canvas, let's introduce another floating button + a drawer, but let's only show top-level comments there, with a possibility of clicking the "Show thread" icon to open another drawer
- Do not render overlays for any drawers - a bit harder to focus maybe, but can still interact with the canvas, zoom/pan it, etc. - but pressing Esc still works

Things that I have to skip because I do not have time:

- Animations
- Keyboard shortcuts
- Bulk actions
- Mini-map
- Persistence
- All accessibility considerations (except for tabbing)
