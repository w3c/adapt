# WAI-Adapt: Navigation and Content Tools for Agentic AI Using Discoverable Destinations Explainer

## Authors

- Abhinav Kumar (@abhina-kumar), SAP Labs India Pvt. Ltd.

## Participate

* Issues: https://github.com/w3c/adapt/issues
* Discussions: https://github.com/w3c/adapt/discussions

## Contents

- [Introduction](#introduction)
- [The Problem: API Dependency Challenge](#the-problem-api-dependency-challenge)
- [Technical Foundation](#technical-foundation)
- [Real-World Applications](#real-world-applications)
- [Scope and Limitations](#scope-and-limitations)
- [Extended Destination Types for AI Tools](#extended-destination-types-for-ai-tools)
- [Open Questions](#open-questions)
- [References](#references)
- [Appendix: Background on Agentic AI and Integration Patterns](#appendix-background-on-agentic-ai-and-integration-patterns)

## Introduction

**Agentic AI systems** are autonomous software agents that can plan, reason, and execute complex multi-step tasks on behalf of users. These systems represent a new frontier in automation, capable of understanding natural language requests and breaking them down into actionable steps. For users with disabilities, these AI agents can serve as powerful assistive technologies, helping navigate digital environments and complete tasks that might otherwise be challenging.

However, there is a fundamental challenge: while these AI agents excel at working with structured APIs, the vast majority of websites (70-80%) do not provide APIs for the functionality users actually need. This forces agents to fall back on brittle web scraping techniques that break whenever sites update their designs.

This explainer proposes extending the [Discoverable Destinations](discoverable-destinations.md) approach to bridge this gap through **Semantic Web Tools**, standardized software components that enable reliable website navigation using semantic identifiers rather than fragile technical selectors. Discoverable Destinations were designed to help humans with accessibility needs find important pages quickly; this same semantic infrastructure serves AI agents acting as assistive technologies equally well.

Instead of AI agents looking for contact information using fragile selectors like "find the element with class `.contact-info`", they use semantic identifiers to say "navigate to the `contact` destination". This approach works consistently across all compliant websites and benefits both direct accessibility (helping users with disabilities navigate) and indirect accessibility (enabling AI assistive technologies to work reliably).

## The Problem: API Dependency Challenge

Today's agentic AI systems operate in a two-tier world of website interaction.

**The Privileged Few (20-30% of sites):**
Sites like Twitter and GitHub provide robust APIs. AI agents work reliably with these: they can access data, perform actions, and integrate seamlessly into workflows.

**The Struggling Majority (70-80% of sites):**
Most websites, from local businesses to government agencies, do not provide APIs for basic functions like finding contact information, accessing help resources, or managing user accounts. This forces AI agents into a world of fragile workarounds:

- **CSS Selector Archaeology**: Hunting for `.contact-info` classes that vanish with the next design update
- **HTML Structure Divination**: Parsing unstructured content that changes without notice
- **Site-Specific Scripting**: Maintaining individual automation for each website, a significant maintenance burden

### Real-World Pain Points

Consider an AI assistant tasked with "auditing accessibility statements across a company's website portfolio." For sites with APIs, this is straightforward. For the majority without APIs, the agent must:

1. Guess where accessibility statements might be located
2. Hope the HTML structure has not changed since the last update
3. Fail gracefully when selectors break, leaving users with incomplete results

**The Core Problem**: A semantic bridge is needed between the reliability of APIs and the universality of web interfaces.

| Approach | Coverage | Reliability | Navigation Token Cost | Maintenance Reality |
|----------|----------|-------------|----------------------|---------------------|
| **APIs Only** | ~20-30% of sites | High | Negligible | Low (when available) |
| **Traditional Scraping** | ~100% of sites | Very Low | Negligible | Constant firefighting |
| **Semantic Web Tools** | Growing with adoption | High | Negligible | Set-and-forget |
| **Computer Use Agents** | ~100% of sites | Probabilistic | Very High | High (sensitive to redesigns) |

## Technical Foundation

The architecture is elegantly simple, built on following core capabilities:

### Core Web Tools Capabilities

* **Destination Discovery**: Enumerating all available Discoverable Destinations for a given site / page 
* **Semantic Navigation**: Navigating to specific destinations using semantic identifiers rather than site-specific selectors
* **Content Retrieval**: Fetching page content from destination URLs and delivering it to LLMs for intelligent processing
* **Intra-page Navigation via ARIA Landmarks**: Discovering available [ARIA landmark roles](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles) on a destination page and navigating the user's browser to a specific labelled section

**Benefits of Semantic Approach:**
- Single set of capabilities works across all compliant websites
- No site-specific customization or maintenance required
- Consistent, predictable behavior for AI agents
- Leverages semantic web standards for reliability

### Discovery Mechanisms

Semantic Web Tools leverage the standardized discovery mechanisms already defined in the Discoverable Destinations proposal. The Discoverable Destinations framework supports multiple discovery methods (like linkset), ensuring AI tools can adapt as new optimization approaches emerge.

### Division of Responsibilities

The system operates through a clear separation of concerns between the LLM (reasoning/coordination) and Semantic Web Tools (technical execution):

**LLM Responsibilities:**
* **Task Planning**: Interpreting user requests and determining which destinations are needed from available destinations.
* **Workflow Coordination**: Orchestrating the sequence of operations
* **Web Page Analysis**: Synthesizing information from web page into coherent responses (like getting a hotel's reception number)
* **Error Handling**: Deciding how to respond when tools encounter failures or missing content
* **User Interaction**: Managing clarifications, progress updates, and result presentation

**Web Tools Responsibilities:**
* **Destination Discovery**: Finding available Discoverable Destinations on target websites
* **Navigation**: Converting semantic destination names to URLs and performing HTTP requests
* **Content Retrieval**: Fetching raw page content and passing it to LLMs for processing
* **Error Reporting**: Detecting and reporting technical failures (network errors, missing pages, authentication failures) to the LLM for decision-making
* **Landmark Discovery and Navigation**: Listing available ARIA landmark labels on the current page and scrolling the user's browser to a specific labelled section

### Leveraging ARIA Landmarks for Intra-page Navigation

Discoverable Destinations solve the *inter-page* navigation problem: finding and reaching the right page. But users sometimes need to reach a specific *section* within a destination page. For example: "take me to the account management section of xyz's help page."

For **content extraction** tasks (e.g. "what is the billing support phone number?"), ARIA landmarks are not essential. LLMs are capable of processing full page content and extracting the relevant information from raw HTML. Using the `<main>` element (or `role="main"`) to filter out navigation bars, footers, and advertisements etc. before passing content to the LLM can reduce noise and token cost, but this is a practical optimisation, not a requirement.

For **intra-page navigation** tasks (e.g. "take me to account management help"), ARIA landmarks are genuinely valuable. When the user asks to be *taken to* a specific section, the agent needs a reliable DOM target to scroll or focus the browser. The LLM can *understand* where "Account Management" is in the HTML, but it cannot *scroll the browser* there without a concrete element to target. Labelled [`region`](https://www.w3.org/TR/wai-aria-1.2/#region) landmarks provide exactly this: standardised, semantic anchors that the tool can use to navigate the user's view to the right part of the page.

This intra-page navigation works as follows:

1. The user asks to be taken to a specific section of a destination page (e.g. "take me to account management help on xyz.com").
2. The LLM calls `navigateToDestination` to reach the `help` page.
3. The LLM calls `discoverLandmarks` with the destination URL to retrieve the list of available landmark labels on the page (e.g. "Getting Started", "Account Management", "Billing Support").
4. The LLM identifies which landmark best matches the user's request and calls `navigateToLandmark` with the destination URL and that label (e.g. `"Account Management"`).
5. The tool locates the matching labelled `region` landmark in the DOM and scrolls or focuses the browser to that element.
6. The user sees the relevant section of the page.

This is primarily relevant in browser-based integration models, such as a browser extension or a browser-native approach, where the tool has direct DOM access to scroll and focus the user's browser. In a server-side model, intra-page navigation is not applicable since there is no browser to control.

The [`navigation`](https://www.w3.org/TR/wai-aria-1.2/#navigation) landmark can also help agents discover secondary navigation paths on a page, revealing links the agent can follow on the user's behalf.

Content authors are encouraged to use the `<main>` element to wrap their primary destination content, and to label distinct content regions with `region` landmarks. This benefits both human users of assistive technologies and AI agents acting on their behalf.

## Real-World Applications

Imagine the possibilities when AI agents can reliably navigate any website using semantic markers, particularly for users who face barriers in traditional web navigation:

**The Accessibility Compliance Assistant**: A disability rights advocate asks their AI assistant to "check accessibility statements across our 50 partner websites." Instead of manually visiting each site or maintaining fragile scrapers, the AI agent systematically discovers and analyzes `accessibility-statement` destinations across all sites in minutes, ensuring comprehensive accessibility monitoring.

**The Cognitive Support Assistant**: A user with cognitive disabilities facing issues with multiple service providers asks for help options. The AI agent discovers `contact` and `help` destinations across different platforms, presenting a comprehensive support landscape in a simplified, consistent format without breaking when sites redesign.

**The Motor Accessibility Aid**: A user with motor impairments wants to update their profile information across platforms but finds repeated navigation challenging. The AI agent navigates to the relevant destination pages on each site, then guides the user through the updates with full context and control, reducing the physical navigation burden.

**The Accessibility Monitoring System**: Disability services organizations need regular checks of accessibility resources across their digital ecosystem. Semantic destinations enable automated discovery of `accessibility-statement` and `help` destinations without the maintenance burden of traditional scraping, ensuring accessibility information remains current and accessible.

These scenarios share a common pattern: AI agents handle the discovery and navigation complexity using LLMs for planning and coordination, while Semantic Web Tools provide reliable technical execution. Humans maintain control over sensitive decisions and actions.

## Scope and Limitations

### What Discoverable Destinations Solve Well

* **Content Discovery**: Finding specific types of pages (help, contact, accessibility statements, product catalogs)
* **Information Extraction**: Extracting data from destination pages
* **Consistent Navigation**: Standardized navigation patterns across different websites

### What Requires Additional Solutions

* **Complex Actions**: Multi-step workflows like password changes, account modifications, or transaction processing
  - *Why Discoverable Destinations are not sufficient*: While destinations can navigate to account settings pages, the actual modification workflows vary dramatically between sites. A password change might require current password verification, security questions, or two-factor authentication in site-specific ways that cannot be standardized through destinations alone.
  - *Solution approach*: Discoverable Destinations provide navigation to relevant areas, then additional tools (APIs, human-in-the-loop) handle the complex workflows.

* **Authenticated Operations**: Actions requiring user-specific authentication and authorization
  - *Why Discoverable Destinations are not sufficient*: While an agent could navigate to a login page using destinations, the authentication mechanisms (OAuth, SAML, multi-factor authentication) require site-specific integration that goes beyond semantic navigation.
  - *Solution approach*: Destinations can navigate to login/authentication pages, but secure authentication requires specialized protocols and often human involvement for security.

* **Site-specific Workflows**: Unique business processes that do not map to standard destinations
  - *Why Discoverable Destinations are not sufficient*: Business processes like "submit insurance claim" or "schedule medical appointment" involve complex, industry-specific workflows that cannot be standardized across all websites.
  - *Solution approach*: Destinations help reach relevant sections, but specialized tools or APIs are needed for complex business logic.

### Human-in-the-Loop for Complex Scenarios

For complex scenarios, a layered approach works best:

1. **Discoverable Destinations**: Provide navigation to relevant areas
2. **API Integration**: Use APIs where available for sensitive operations
3. **Human-in-the-Loop**: Include human oversight for sensitive or complex tasks

The primary approach for sensitive operations should be human-in-the-loop, where AI agents navigate to relevant pages using semantic destinations, extract and present available options to users, then hand control to humans for actual execution.

### Computer Use Agents: A Different Navigation Approach

Computer Use Agent (CUA) systems are a class of AI agent that interact with a browser by taking screenshots and issuing low-level input events such as mouse clicks and keyboard actions. CUA does not use Discoverable Destinations or Semantic Web Tools. It navigates a website by visually interpreting screenshots and simulating user input, without any awareness of `<link>` elements or semantic destination identifiers.

CUA-based navigation can, in principle, reach any page on any website without the site implementing Discoverable Destinations. However it carries significant practical costs:

* Each navigation step requires the agent to take a screenshot and interpret it before deciding the next action. This consumes substantially more tokens per task than a Semantic Web Tools approach, where a single tool call retrieves all available destinations from the page `<head>`. Tasks that involve visiting several pages can become prohibitively expensive.
* Because navigation decisions are made by visually analysing a rendered page, the process is inherently probabilistic. The agent may misidentify a link, click the wrong element, or fail to locate a destination if it is not immediately visible in the viewport.
* CUA systems are sensitive to changes in a site's visual design. A layout update that has no effect on the `<link>` elements in the page `<head>` may cause a CUA agent to fail, requiring the agent to be re-evaluated against the new design.
* Each step in a CUA workflow requires a round-trip through the model to process a screenshot before the next action can be taken, making these workflows substantially slower than the lightweight tool calls used in the semantic approach.

For these reasons, CUA should not be considered a primary approach for agentic web navigation. It is best understood as a fallback or self-healing mechanism in two specific situations. First, if a site does not yet implement Discoverable Destinations and no API is available, a CUA agent may be able to complete the task, accepting the associated token cost and reduced reliability. Second, if a semantic navigation step fails unexpectedly, for example because a destination URL has temporarily changed, a CUA agent can be invoked to attempt the same action visually. Once the CUA agent completes the recovery step, the semantic approach can resume for subsequent steps. This layered strategy allows accessibility tools to degrade gracefully rather than failing entirely when semantic infrastructure is absent or temporarily unavailable.

## Extended Destination Types for AI Tools

The Discoverable Destinations proposal primarily serves human accessibility needs. For agentic AI systems operating as assistive technologies, a few additional destination types could be beneficial:

### Example Additional Destinations

* **`account-settings`**: User profile/account management pages, essential for users who need AI assistance managing their digital presence
* **`accessibility-preferences`**: User accessibility settings and preferences, enabling AI agents to help users configure accessible experiences

These destination types address common accessibility and agentic AI use cases where sites lack APIs, directly benefiting users by providing clearer navigation paths while enabling AI assistive technologies to operate reliably.

## Open Questions

### Discoverable Destinations Extensions

* **New Destination Types**: Should additional destinations like `account-settings` and `accessibility-preferences` be standardized for AI-assisted accessibility use cases?
* **Discovery Optimization**: The Discoverable Destinations specification considers alternative centralized discovery mechanisms, such as `/.well-known/destinations` and Linksets. Should these be formally adopted to support efficient discovery?

### Standardization Process

* **Governance Model**: How should new AI-relevant destination types be proposed, reviewed, and added to the standard?

### Integration and Fallback

* **CUA Fallback Triggering**: What conditions should trigger a CUA fallback when semantic navigation fails? A clear policy would help implementors decide when to accept the additional cost of visual navigation rather than reporting a failure to the user.
* **Graceful Degradation**: Should tools that implement the Semantic Web Tools API be required to declare whether they support CUA fallback, so that orchestrating agents can make informed decisions about task routing?

## References

### Foundational Work

* [WAI-Adapt: Discoverable Destinations Explainer](discoverable-destinations.md)
* [Model Context Protocol (MCP) Specification](https://github.com/modelcontextprotocol/specification)
* [WebMCP](https://github.com/webmachinelearning/webmcp)
* [Chrome Extensions Developer Guide](https://developer.chrome.com/docs/extensions/)
* [RFC 8615: Well-Known URIs](https://datatracker.ietf.org/doc/html/rfc8615)
* [RFC 9264: Linksets](https://www.rfc-editor.org/rfc/rfc9264)

---

## Appendix: Background on Agentic AI and Integration Patterns

### How AI Agents Use Semantic Destinations

A common question is how AI agents learn to use semantic markers exposed via Discoverable Destinations. The answer is through explicit tool integration rather than expecting agents to discover these patterns through prior training.

**Tool Integration**: AI frameworks like MCP (Model Context Protocol) allow developers to equip agents with specific tools that understand Discoverable Destinations. These tools handle the technical work of discovering destinations, navigating to them, and fetching content. The agent does not need to know anything about `<link>` elements or HTML structure.

**Instruction-Following**: Modern LLMs excel at following instructions. When given a tool described as "navigate to the help destination on this website", they can invoke it correctly and coordinate multiple tools in sequence without site-specific training. The semantics are in the tool descriptions, not in the model weights.

### Integration Architecture Patterns

#### Core Integration Workflow

Agentic AI systems integrate with Semantic Web Tools through a workflow that works consistently across all websites implementing Discoverable Destinations:

1. **Destination Discovery**: The agent uses Semantic Web Tools to discover available destinations on the target page.
2. **Destination Selection and Planning**: Based on discovered destinations and the user's request, the agent plans which destinations to visit and in what sequence.
3. **Semantic Navigation and Content Retrieval**: The agent navigates to selected destinations and retrieves page content for analysis.
4. **LLM Processing and Synthesis**: The agent processes retrieved content using the LLM to extract relevant information, make decisions, and synthesize results.

#### Workflow Characteristics

**Uniform Approach**: The same Semantic Web Tools and workflow pattern works across all websites that implement Discoverable Destinations, eliminating the need for site-specific customization.

**Semantic Reliability**: Navigation based on semantic destinations (`contact`, `help`, `accessibility-statement`) rather than fragile CSS selectors ensures consistent operation even when sites update their visual design.

**Clear Separation**: Semantic Web Tools handle technical navigation and content retrieval; LLMs handle intelligent processing and decision-making. Technical failures such as rate limiting, authentication errors, or missing pages are reported to the LLM, which decides how to respond.

#### Example Integration with Model Context Protocol (MCP)

The [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/specification) provides one example of how tools could integrate with AI systems. MCP is an open standard that enables AI applications (Agents) to securely connect with external tools and data sources.

**MCP Architecture Overview:**
MCP operates on a client-server model:
- **MCP Clients**: AI applications (agents)
- **MCP Servers**: Applications that expose tools and resources to AI systems
- **Protocol**: JSON-RPC over stdio, HTTP with SSE (Server-Sent Events), or WebSocket connections

**Semantic Web Tools as MCP Tools:**
Semantic Web Tools can be exposed through MCP servers, providing AI agents with standardized tools to access websites.

**Example MCP Integration Workflow:**
When a user requests an AI agent to "find support options across my service providers," a system using MCP might follow this pattern:

1. The agent uses Semantic Web Tools to discover available destinations on each target website
2. Based on discovered destinations, the agent determines the optimal navigation strategy  
3. The agent navigates to relevant destinations and retrieves content
4. The AI processes the retrieved content to extract and synthesize information

#### Deployment Patterns: Browser Extension, Server-side, and Browser-native

Semantic Web Tools can be deployed in a variety of ways, and new integration approaches may emerge as the ecosystem matures. The patterns described here represent approaches that have been demonstrated in practice. The right choice depends on two questions: whether the task requires access to the user's live browser session, and whether the tools run inside the user's environment or on a remote server.

**Browser Extension Model (Recommended)**

In this model, a browser extension provides the Semantic Web Tools to the AI agent. The extension runs within the user's browser and uses standard browser extension APIs to read `<link>` elements from the current page, update browser tabs, and execute scripts in the page context. This is the model demonstrated in the reference prototypes accompanying this work.

The browser extension model has the following characteristics:

- Destination discovery reads directly from the live DOM of the tab currently open in the user's browser, so the results are always current and scoped to the active page.
- Navigation updates the browser tab the user is looking at, preserving session cookies and authentication state across page loads.
- Intra-page navigation is fully supported because the extension can execute scripts in the page to locate and scroll to labelled ARIA landmark regions.
- The extension communicates with the AI agent through a local or cloud-hosted service, while all browser-side execution remains within the user's session.

**Server-side Model**

In this model, the tools run on a remote server and make direct HTTP requests to target websites. No browser session is involved. This approach is well suited for batch tasks on public websites, such as auditing accessibility statements across a portfolio of sites, where no authentication or live browser interaction is required. It cannot access the user's session, cannot navigate a tab the user is looking at, and cannot perform intra-page navigation.

**Browser-native Model (WebMCP)**

[WebMCP](https://github.com/webmachinelearning/webmcp) is an emerging proposal in which the web page itself exposes tools directly to AI agents through a JavaScript API. Because the tools execute as part of the page's own code, they operate within the user's session and have direct DOM access. This model is architecturally well suited to Discoverable Destinations and may become the preferred approach as the proposal matures and gains browser support. At present, browser extensions represent the practical deployment model that achieves the same capabilities using stable, widely supported APIs.

#### Sample Semantic Web Tools API

Semantic Web Tools expose a standardized set of capabilities that work uniformly across any website implementing Discoverable Destinations. These tools support two distinct workflows:

**Workflow 1 - Direct Navigation**: User wants to visit a specific page (e.g., "take me to the help page")

**Workflow 2 - Information Extraction**: User wants specific information (e.g., "get the customer service phone number")

**Workflow 3 - Intra-page Navigation**: User wants to reach a specific section within a destination page (e.g., "take me to account management help")

```
Tool: discoverDestinations
Description: Discover available semantic destinations on a page
Parameters:
- url (string): Page URL to discover destinations from
Returns: List of available destinations with types and URLs

Tool: navigateToDestination  
Description: Navigate to a semantic destination
Parameters:
- url (string): Base page URL containing the destination reference
- destinationType (string): Destination type (e.g., contact, help, accessibility-statement)
Returns: Navigation result with destination URL

Tool: fetchContentFromDestination
Description: Navigate to a semantic destination and retrieve page content for LLM processing. Prioritises content within the <main> landmark when present, filtering out peripheral page elements.
Parameters:
- url (string): Base page URL containing the destination reference  
- destinationType (string): Destination type (e.g., contact, help, accessibility-statement)
Returns: Navigation result with destination URL and extracted page content for LLM analysis

Tool: discoverLandmarks
Description: Discover available ARIA landmark labels on the current page. Only applicable in browser-based deployments (browser extension or browser-native model).
Parameters:
- url (string): URL of the page to discover landmarks on (typically the destination URL returned by a previous navigateToDestination call)
Returns: List of landmark roles and their labels (e.g. [{role: "region", label: "Account Management"}, {role: "navigation", label: "Main Menu"}])

Tool: navigateToLandmark
Description: Navigate the user's browser to a specific labelled landmark region on the current page. Only applicable in browser-based deployments (browser extension or browser-native model).
Parameters:
- url (string): URL of the page containing the landmark
- landmarkLabel (string): Label of the landmark region to scroll/focus to (e.g., "Account Management", "Billing Support")
Returns: Success/failure indication and the landmark element identifier
```

> **Note:** For content extraction tasks, LLMs can process full page content directly and ARIA landmarks are not essential. Using `<main>` to filter peripheral content is a practical optimisation that reduces noise and token cost. For intra-page navigation tasks (where the user wants to be *taken to* a specific section), the LLM first calls `discoverLandmarks` with the destination URL to learn what sections are available, then calls `navigateToLandmark` to scroll the user's browser to the matching labelled [ARIA landmark](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles) region. Both landmark tools require a browser-based deployment (browser extension or browser-native model) that has direct access to the page DOM.

**Usage Examples:**
* **Inter-page Navigation**: `navigateToDestination` for "take me to the help page"
* **Intra-page Navigation**: `navigateToDestination` to reach the help page, then `discoverLandmarks(url)` to list available sections, then `navigateToLandmark(url, "Account Management")` for "take me to account management help"
* **Information Extraction**: `fetchContentFromDestination` for "what is the customer service phone number?" (LLM processes the returned content to extract the answer)
