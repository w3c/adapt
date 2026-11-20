# WAI-Adapt: Navigation and Content Tools for Agentic AI Using Discoverable Destinations Explainer

## Authors

- Abhinav Kumar (@abhina-kumar), SAP Labs India Pvt. Ltd.

## Participate

* Issues: https://github.com/w3c/adapt/issues
* Discussions: https://github.com/w3c/adapt/discussions

## Contents

- [Introduction](#introduction)
- [The Problem](#the-problem)
- [How Discoverable Destinations Helps](#how-discoverable-destinations-helps)
- [Alternatives Considered](#alternatives-considered)
  * [Traditional Web Scraping](#traditional-web-scraping)
  * [Computer Use Agents](#computer-use-agents)
  * [Site-specific APIs](#site-specific-apis)
- [Scope of Discoverable Destinations for Agentic Use](#scope-of-discoverable-destinations-for-agentic-use)
- [Extended Destination Types for AI Tools](#extended-destination-types-for-ai-tools)
- [Open Questions](#open-questions)
- [References](#references)
- [Appendix: Integration Patterns and Sample API](#appendix-integration-patterns-and-sample-api)

## Introduction

Agentic AI systems are autonomous software agents that can plan, reason, and execute complex multi-step tasks on behalf of users. For users with disabilities, these agents can serve as powerful assistive technologies, helping navigate digital environments and completing tasks that might otherwise be challenging.

However, there is a fundamental problem: while AI agents work well with structured APIs, the vast majority of websites do not expose APIs for the functionality users actually need. This forces agents to rely on fragile techniques that break whenever a site updates its design.

This explainer proposes extending the [Discoverable Destinations](discoverable-destinations.md) approach to address this gap. Discoverable Destinations were designed to help humans with accessibility needs find important pages quickly. The same semantic infrastructure serves AI agents acting as assistive technologies equally well.

The technical specification of how AI agents leverage Discoverable Destinations, including ARIA landmark navigation and integration patterns, is in the [WAI-Adapt: Discoverable Destinations W3C Note](../destinations/index.html#agentic-ai-and-machine-navigation). This explainer covers the problem context, the alternatives considered (including when and why to use a Computer Use Agent as a fallback), and open questions.

## The Problem

Today's agentic AI systems face a two-tier web.

**Sites with APIs (roughly 20 to 30 percent):** Services like GitHub or large e-commerce platforms provide structured APIs. Agents work reliably with these: they access data, perform actions, and integrate predictably.

**Sites without APIs (roughly 70 to 80 percent):** Most websites — local businesses, government agencies, healthcare providers — do not expose APIs for common tasks like finding contact information, locating help resources, or discovering accessibility statements. This leaves agents with poor alternatives:

* Hunting for CSS selectors like `.contact-info` that vanish with the next design update
* Parsing unstructured HTML that changes without notice
* Maintaining site-specific scripts, a constant and significant maintenance burden

Consider an AI assistant asked to "audit accessibility statements across our fifty partner websites." For the minority with APIs this is trivial. For the rest, the agent must guess where the page lives, hope the structure has not changed, and fail silently when selectors break — leaving users with incomplete results.

What is needed is a semantic bridge between the reliability of APIs and the universality of web interfaces.

| Approach | Coverage | Reliability | Token Cost | Maintenance |
|---|---|---|---|---|
| APIs | ~20 to 30% of sites | High | Negligible | Low |
| Traditional scraping | ~100% of sites | Very low | Negligible | Constant |
| Semantic Web Tools | Growing with adoption | High | Negligible | None |
| Computer Use Agents | ~100% of sites | Probabilistic | Very high | High |

## How Discoverable Destinations Helps

Discoverable Destinations give AI agents the same semantic navigation infrastructure designed for human assistive technologies. Instead of searching for contact information using a fragile CSS selector, an agent uses a semantic identifier to navigate to the `contact` destination. This works consistently across all compliant websites.

**Semantic Web Tools** are software components that expose the Discoverable Destinations mechanism as callable tools to AI agents. The agent does not need to know anything about `<link>` elements or HTML structure. It calls a tool that handles discovery, navigation, and content retrieval.

The core capabilities are:

* **Destination Discovery**: Enumerate all Discoverable Destinations available on a given site or page
* **Semantic Navigation**: Navigate to a destination using its semantic identifier rather than a site-specific URL or selector
* **Content Retrieval**: Fetch page content from a destination and deliver it to the LLM for processing, filtered through the `<main>` landmark to reduce noise
* **Intra-page Navigation**: Discover labelled ARIA landmark regions on a destination page and scroll the user's browser to a specific section (browser-based deployments only)

The full technical specification — including how the LLM and tools divide responsibilities, the browser extension, server-side, and browser-native deployment patterns — is in the [W3C Note](../destinations/index.html#agentic-ai-and-machine-navigation).

## Alternatives Considered

### Traditional Web Scraping

Scraping parses HTML structure or matches CSS selectors to find content. It achieves broad coverage — any website can in principle be scraped — and adds no token cost per navigation step.

The critical problem is reliability. Selectors are tied to a site's visual design and break whenever the site is updated. Maintaining scrapers across dozens or hundreds of sites is a significant ongoing burden. For accessibility use cases where agents act on behalf of users with disabilities, silent failures or stale data are unacceptable outcomes.

Semantic Web Tools achieve the same broad coverage once sites adopt Discoverable Destinations, with far higher reliability and zero ongoing maintenance. Scraping remains a last resort for sites that have not yet adopted the standard.

### Computer Use Agents

Computer Use Agent (CUA) systems interact with a browser by taking screenshots and issuing low-level input events such as mouse clicks and keyboard presses. Because they navigate visually rather than semantically, they can in principle reach any page on any website without the site implementing Discoverable Destinations.

However, CUA-based navigation has significant practical limitations for accessibility use cases:

* **Token cost**: Each navigation step requires at least one screenshot and a model round-trip to interpret it before the next action. Tasks requiring several page visits can become prohibitively expensive. A Semantic Web Tools call that reads all destinations from a `<link>` element costs a fraction of this.

* **Reliability**: Navigation decisions are made by visually analysing a rendered page, which is inherently probabilistic. The agent may misidentify a link, click the wrong element, or fail to find a destination that is not visible in the current viewport.

* **Design sensitivity**: CUA agents are fragile under visual redesigns. A layout change that leaves the page's `<link>` elements completely untouched can cause a CUA agent to fail entirely on the next run.

* **Speed**: Because each interaction requires a model round-trip to process a screenshot, CUA workflows are substantially slower than a lightweight tool call.

For these reasons, CUA is not a primary approach for agentic accessibility work. It is best used as a fallback in two specific situations: when a site has not yet adopted Discoverable Destinations and no API is available, and when a semantic navigation step fails unexpectedly and a one-off visual recovery is needed. After the CUA recovery step, semantic navigation resumes. This layered strategy allows accessibility tools to degrade gracefully rather than failing completely.

The comparison is summarised in the table in [The Problem](#the-problem) section.

### Site-specific APIs

Where a site provides an API for the needed functionality, using it is the most reliable option. API-based access is fast, structured, and version-stable.

The limitation is coverage. APIs exist for roughly 20 to 30 percent of sites, and even on API-enabled sites, common accessibility-relevant pages (accessibility statements, help pages, contact information) are rarely exposed through APIs. Discoverable Destinations and site-specific APIs are complementary: the standard handles navigation to common pages across any compliant site, while APIs handle complex or sensitive operations on the minority of sites that provide them.

## Scope of Discoverable Destinations for Agentic Use

Discoverable Destinations address navigation to common page types and content retrieval from those pages. They work across any compliant site without site-specific configuration.

Certain tasks require solutions beyond Discoverable Destinations:

* Complex workflows such as password changes, account modifications, or transaction processing may vary dramatically between sites. Discoverable Destinations can navigate to the relevant starting point, but the actual workflow may require additional tools or human involvement.

* Authenticated operations requiring user-specific authorisation need specialised protocols and often human involvement for security.

For complex scenarios, a layered approach works well: Discoverable Destinations provide navigation to relevant areas, site-specific APIs handle sensitive operations where available, and human oversight is included for sensitive or complex tasks. Where neither semantic destinations nor APIs are available, a Computer Use Agent can serve as a fallback, as described in the Alternatives Considered section above.

## Extended Destination Types for AI Tools

The current set of Discoverable Destinations was designed around human accessibility needs. For AI agents acting as assistive technologies, a small number of additional destination types could be valuable:

* **`account-settings`**: User profile and account management pages. AI agents helping users with disabilities manage their digital presence across platforms need a reliable way to reach these pages without site-specific knowledge.
* **`accessibility-preferences`**: User accessibility settings and preferences. An AI agent helping a user configure an accessible experience needs to locate this page consistently across different services.

These are proposed additions, not yet in the standard. Proposals for new destination types are discussed in the [W3C Note](../destinations/index.html#requesting-additional-destination-types).

## Open Questions

### New destination types for agentic use cases

Should `account-settings`, `accessibility-preferences`, and similar destinations be standardised for AI-assisted accessibility? The current governance process for proposing new types is under development. Proposals can be raised as issues in the [WAI-Adapt GitHub repository](https://github.com/w3c/adapt/issues).

### CUA fallback policy

Under what conditions should an agent trigger a CUA fallback rather than reporting a failure to the user? A clear policy would help implementors decide when the additional token cost and reduced reliability of visual navigation are acceptable. Options include triggering on any semantic navigation failure, only after a configurable number of retries, or only when the user has explicitly enabled CUA fallback.

### Capability declaration

Should tools that implement the Semantic Web Tools interface be required to declare whether they support CUA fallback, so that orchestrating agents can make informed decisions about task routing? Without this, an agent cannot know in advance whether a fallback is available.

### Discovery optimisation for agents

Agents querying many sites benefit from a centralised discovery endpoint that reduces per-page overhead. The open question of whether a well-known URI endpoint should complement per-page `<link>` declarations (discussed in the [Discoverable Destinations explainer](discoverable-destinations.md#discoverability-and-repetition)) is particularly relevant for agents that query many sites in a single session.

## References

* [WAI-Adapt: Discoverable Destinations W3C Note](../destinations/index.html)
* [WAI-Adapt: Discoverable Destinations Explainer](discoverable-destinations.md)
* [Model Context Protocol (MCP) Specification](https://github.com/modelcontextprotocol/specification)
* [WebMCP](https://github.com/webmachinelearning/webmcp)
* [Chrome Extensions Developer Guide](https://developer.chrome.com/docs/extensions/)
* [RFC 8615: Well-Known URIs](https://datatracker.ietf.org/doc/html/rfc8615)
* [RFC 9264: Linksets](https://www.rfc-editor.org/rfc/rfc9264)

---

## Appendix: Integration Patterns and Sample API

> **Note:** The W3C Note is the authoritative reference for integration patterns; this appendix provides context for the sample API below.

### How AI Agents Learn to Use Semantic Destinations

AI agents use Discoverable Destinations through explicit tool integration, not through pattern recognition learned during training. Frameworks like the Model Context Protocol (MCP) allow developers to equip agents with specific tools that understand Discoverable Destinations. The agent calls a tool described as "navigate to the help destination on this website" and the tool handles all the HTML mechanics. The semantics live in the tool descriptions, not in model weights — so agents work correctly on any compliant site without site-specific training.

### Sample Semantic Web Tools API

These tools work uniformly across any website implementing Discoverable Destinations and support three workflows:

**Workflow 1 — Direct Navigation**: "Take me to the help page"

**Workflow 2 — Information Extraction**: "What is the customer service phone number?"

**Workflow 3 — Intra-page Navigation**: "Take me to the account management section of the help page" (browser-based deployments only)

```
Tool: discoverDestinations
Description: Discover available semantic destinations on a page
Parameters:
  url (string): Page URL to discover destinations from
Returns: List of available destinations with types and URLs

Tool: navigateToDestination
Description: Navigate to a semantic destination
Parameters:
  url (string): Base page URL containing the destination reference
  destinationType (string): Destination type (e.g. contact, help, accessibility-statement)
Returns: Navigation result with destination URL

Tool: fetchContentFromDestination
Description: Navigate to a destination and retrieve page content for LLM processing.
             Filters to content within the <main> landmark when present.
Parameters:
  url (string): Base page URL containing the destination reference
  destinationType (string): Destination type (e.g. contact, help, accessibility-statement)
Returns: Destination URL and extracted page content

Tool: discoverLandmarks
Description: List available ARIA landmark labels on the current page.
             Browser-based deployments only (browser extension or browser-native model).
Parameters:
  url (string): URL of the page to inspect
Returns: List of landmark roles and labels (e.g. [{role: "region", label: "Account Management"}])

Tool: navigateToLandmark
Description: Scroll the user's browser to a specific labelled landmark region.
             Browser-based deployments only (browser extension or browser-native model).
Parameters:
  url (string): URL of the page containing the landmark
  landmarkLabel (string): Label of the target region (e.g. "Account Management")
Returns: Success or failure, and the matched element identifier
```

**Usage patterns:**
* Direct navigation: `navigateToDestination(url, "help")` — takes the user to the help page
* Intra-page navigation: `navigateToDestination` to reach the page, then `discoverLandmarks(url)` to list sections, then `navigateToLandmark(url, "Account Management")` to scroll there
* Information extraction: `fetchContentFromDestination(url, "contact")` — LLM extracts the answer from the returned content
