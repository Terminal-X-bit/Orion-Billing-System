// Test environment bootstrap — loaded via bunfig.toml [test].preload.
//
// bun test runs plain TS under Bun with no DOM, but React DOM needs a
// document. happy-dom's global registrator installs a full window/document
// globally — much lighter than jsdom.
import { GlobalRegistrator } from '@happy-dom/global-registrator'

GlobalRegistrator.register()

// React's act() only takes effect when it knows it is running in a test
// environment (RTL/vitest set this for us; bun test does not).
;(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
