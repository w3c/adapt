# WAI-Adapt: Navigation and Content Tools for Agentic AI Using Well-known Destinations Explainer

## Authors

- Abhinav Kumar (@abhina-kumar), SAP Labs India Pvt. Ltd.

## Participate

* Issues: https://github.com/w3c/adapt/issues
* Discussions: https://github.com/w3c/adapt/discussions

## Contents

- [Introduction](#introduction)
- [The Problem: API Dependency Challenge](#the-problem-api-dependency-challenge)
- [The Solution: Semantic Web Tools](#the-solution-semantic-web-tools)
- [Building on Well-known Destinations](#building-on-well-known-destinations)
- [Technical Foundation](#technical-foundation)
- [Real-World Applications](#real-world-applications)
- [Scope and Limitations](#scope-and-limitations)
- [Extended Destination Types for AI Tools](#extended-destination-types-for-ai-tools)
- [Open Questions](#open-questions)
- [References](#references)
- [Appendix: Background on Agentic AI and Integration Patterns](#appendix-background-on-agentic-ai-and-integration-patterns)

## Introduction

**Agentic AI systems** are autonomous software agents that can plan, reason, and execute complex multi-step tasks on behalf of users. These systems represent a new frontier in automation, capable of understanding natural language requests and breaking them down into actionable steps. For users with disabilities, these AI agents can serve as powerful assistive technologies, helping navigate digital environments and complete tasks that might otherwise be challenging.

However, there's a fundamental challenge: while these AI agents excel at working with structured APIs, the vast majority of websites (70-80%) don't provide APIs for the functionality users actually need. This forces agents to fall back on brittle web scraping techniques that break whenever sites update their designs.

This explainer proposes extending the [Well-known Destinations](well-known-destinations.md) approach to bridge this gap through **Semantic Web Tools** - standardized software components that enable reliable website navigation using semantic identifiers rather than fragile technical selectors.

Instead of AI agents looking for contact information using fragile selectors like "find the element with class `.contact-info`", they would use semantic identifiers to say "navigate to the 'contact' destination". This semantic approach works consistently across all compliant websites, creating reliable digital experiences.

This approach benefits both direct accessibility (helping users with disabilities navigate websites) and indirect accessibility (enabling AI assistive technologies to work reliably).

## The Problem: API Dependency Challenge

Today's agentic AI systems face a stark reality, they live in a two-tier world of website interaction.

**The Privileged Few (20-30% of sites):**
Sites like Twitter, GitHub provide robust APIs. Here AI agents work beautifully, they can reliably access data, perform actions, and integrate seamlessly into workflows.

**The Struggling Majority (70-80% of sites):**
Most websites from local businesses to government agencies don't provide APIs for basic functions like finding contact information, accessing help resources, or managing user accounts. This forces AI agents into a world of fragile workarounds:

- **CSS Selector Archaeology**: Hunting for `.contact-info` classes that vanish with the next design update
- **HTML Structure Divination**: Parsing unstructured content that changes without notice  
- **Site-Specific Scripting**: Maintaining individual automation for each website which is a maintenance nightmare

### Real-World Pain Points

Consider an AI assistant tasked with "auditing accessibility statements across a company's website portfolio." For sites with APIs, this is straightforward. For the majority without APIs, the agent must:

1. Guess where accessibility statements might be located
2. Hope the HTML structure hasn't changed since the last update
3. Fail gracefully when selectors break, leaving users with incomplete results

**The Core Problem**: We need a semantic bridge between the reliability of APIs and the universality of web interfaces.

| Approach | Coverage | Reliability | Maintenance Reality |
|----------|----------|-------------|---------------------|
| **APIs Only** | ~20-30% of sites | High | Low (when available) |
| **Traditional Scraping** | ~100% of sites | Very Low | Constant firefighting |
| **Semantic Web Tools** | Growing with adoption | High | Set-and-forget |

## The Solution: Semantic Web Tools

Well-known Destinations offer an elegant solution to this challenge. Instead of websites needing to build full APIs, they can provide semantic signposts that AI agents can follow reliably.

Rather than an AI agent hunting for contact information using fragile selectors like `document.querySelector('.contact-page-link')`, it simply looks for the Well-Known Destination for Contact page. This approach transforms brittle technical navigation into reliable semantic discovery.

## Building on Well-known Destinations

The beauty of this approach lies in its foundation, the [Well-known Destinations](well-known-destinations.md) proposal already provides the semantic infrastructure we need, with a core focus on accessibility.

**From Human Accessibility to AI-Assisted Accessibility**: Well-known Destinations were designed to help humans with accessibility needs find important pages quickly. This same semantic approach perfectly serves AI agents also acting as assistive technologies, what helps humans with disabilities navigate also enables machines to provide consistent assistance. These Well-known Destinations act as a basis for tools used by agents to discover and navigate to these destinations.

## Technical Foundation

The architecture is elegantly simple, built on three core capabilities:

### Core Web Tools Capabilities

* **Destination Discovery**: Enumerating all available Well-known Destinations for a given site / page 
* **Semantic Navigation**: Navigating to specific destinations using semantic identifiers rather than site-specific selectors
* **Content Retrieval**: Fetching page content from destination URLs and delivering it to LLMs for intelligent processing

**Benefits of Semantic Approach:**
- Single set of capabilities works across all compliant websites
- No site-specific customization or maintenance required
- Consistent, predictable behavior for AI agents
- Leverages semantic web standards for reliability

### Discovery Mechanisms

Semantic Web Tools leverage the standardized discovery mechanisms already defined in the Well-known Destinations proposal. The Well-known Destinations framework supports multiple discovery methods (like linkset), ensuring AI tools can adapt as new optimization approaches emerge.

### Division of Responsibilities

The system operates through a clear separation of concerns between the LLM (reasoning/coordination) and Semantic Web Tools (technical execution):

**LLM Responsibilities:**
* **Task Planning**: Interpreting user requests and determining which destinations are needed from available destinations.
* **Workflow Coordination**: Orchestrating the sequence of operations
* **Web Page Analysis**: Synthesizing information from web page into coherent responses (like getting a hotel's reception number)
* **Error Handling**: Deciding how to respond when tools encounter failures or missing content
* **User Interaction**: Managing clarifications, progress updates, and result presentation

**Web Tools Responsibilities:**
* **Destination Discovery**: Finding available Well-known Destinations on target websites
* **Navigation**: Converting semantic destination names to URLs and performing HTTP requests
* **Content Retrieval**: Fetching raw page content and passing it to LLMs for processing
* **Error Reporting**: Detecting and reporting technical failures (network errors, missing pages, authentication failures) to the LLM for decision-making

### Content Processing Strategy

Semantic Web Tools handle only the technical aspects of content retrieval, while LLMs handle all content processing:

- **Semantic Web Tools**: Navigate to destination URLs or fetch raw HTML content from destination
- **LLMs**: Extract, clean, structure, and interpret the content based on specific task requirements

This division ensures that intelligent processing of unstructured web content is handled by LLMs, which can adapt to different page layouts, content types, and extraction requirements. Technical issues like rate limiting, authentication failures, or access restrictions are reported to the LLM, which decides how to respond (retry, use alternative destinations, request human intervention, etc.).

## Real-World Applications

Imagine the possibilities when AI agents can reliably navigate any website using semantic markers, particularly for users who face barriers in traditional web navigation:

**The Accessibility Compliance Assistant**: A disability rights advocate asks their AI assistant to "check accessibility statements across our 50 partner websites." Instead of manually visiting each site or maintaining fragile scrapers, the AI agent systematically discovers and analyzes `accessibility-statement` destinations across all sites in minutes, ensuring comprehensive accessibility monitoring.

**The Cognitive Support Assistant**: A user with cognitive disabilities facing issues with multiple service providers asks for help options. The AI agent discovers `contact` and `help` destinations across different platforms, presenting a comprehensive support landscape in a simplified, consistent format without breaking when sites redesign.

**The Motor Accessibility Aid**: A user with motor impairments wants to update their profile information across platforms but finds repeated navigation challenging. The AI agent navigates to `account-settings` destinations on each site, then guides the user through the updates with full context and control, reducing the physical navigation burden.

**The Accessibility Monitoring System**: Disability services organizations need regular checks of accessibility resources across their digital ecosystem. Semantic destinations enable automated discovery of `accessibility-statement` and `help` destinations without the maintenance burden of traditional scraping, ensuring accessibility information remains current and accessible.

These scenarios share a common pattern: AI agents handle the discovery and navigation complexity using LLMs for planning and coordination, while Semantic Web Tools provide reliable technical execution. Humans maintain control over sensitive decisions and actions.

## Scope and Limitations

### What Well-known Destinations Solve Well

* **Content Discovery**: Finding specific types of pages (help, contact, accessibility statements, product catalogs)
* **Information Extraction**: Extracting data from destination pages
* **Consistent Navigation**: Standardized navigation patterns across different websites

### What Requires Additional Solutions

* **Complex Actions**: Multi-step workflows like password changes, account modifications, or transaction processing
  - *Why Well-known Destinations aren't sufficient*: While destinations can navigate to account settings pages, the actual modification workflows vary dramatically between sites. A password change might require current password verification, security questions, or two-factor authentication in site-specific ways that can't be standardized through destinations alone.
  - *Solution approach*: Well-known Destinations provide navigation to relevant areas, then additional tools (APIs, human-in-the-loop) handle the complex workflows.

* **Authenticated Operations**: Actions requiring user-specific authentication and authorization  
  - *Why Well-known Destinations aren't sufficient*: While an agent could navigate to a login page using destinations, the authentication mechanisms (OAuth, SAML, multi-factor authentication) require site-specific integration that goes beyond semantic navigation.
  - *Solution approach*: Destinations can navigate to login/authentication pages, but secure authentication requires specialized protocols and often human involvement for security.

* **Site-specific Workflows**: Unique business processes that don't map to standard destinations
  - *Why Well-known Destinations aren't sufficient*: Business processes like "submit insurance claim" or "schedule medical appointment" involve complex, industry-specific workflows that can't be standardized across all websites.
  - *Solution approach*: Destinations help reach relevant sections, but specialized tools or APIs are needed for complex business logic.

### Human-in-the-Loop for Complex Scenarios

For complex scenarios, a layered approach works best:

1. **Well-known Destinations**: Provide navigation to relevant areas
2. **API Integration**: Use APIs where available for sensitive operations
3. **Human-in-the-Loop**: Include human oversight for sensitive or complex tasks

The primary approach for sensitive operations should be human-in-the-loop, where AI agents navigate to relevant pages using semantic destinations, extract and present available options to users, then hand control to humans for actual execution.

## Extended Destination Types for AI Tools

The Well-known Destinations proposal primarily serves human accessibility needs. For agentic AI systems operating as assistive technologies, a few additional destination types could be beneficial:

### Example Additional Destinations

* **`search`**: Site-specific search functionality when no search API is available, critical for users who rely on AI assistance to find information
* **`account-settings`**: User profile/account management pages, essential for users who need AI assistance managing their digital presence
* **`accessibility-preferences`**: User accessibility settings and preferences, enabling AI agents to help users configure accessible experiences

These destination types address common accessibility and agentic AI use cases where sites lack APIs, directly benefiting users by providing clearer navigation paths while enabling AI assistive technologies to operate reliably.

## Open Questions

### Well-known Destinations Extensions

* **New Destination Types**: Should additional destinations like `search` and `account-settings` be standardized?
* **Discovery Optimization**: The Well-Known Destinations specification considers alternative centralized discovery mechanisms, such as `/.well-known/destinations` and Linksets. Should these be formally adopted to support efficient discovery?

### Standardization Process

* **Governance Model**: How should new AI-relevant destination types be proposed, reviewed, and added to the standard?

## References

### Foundational Work

* [WAI-Adapt: Well-known Destinations Explainer](well-known-destinations.md)
* [Model Context Protocol (MCP) Specification](https://github.com/modelcontextprotocol/specification)
* [WebMCP](https://github.com/webmachinelearning/webmcp)
* [RFC 8615: Well-Known URIs](https://datatracker.ietf.org/doc/html/rfc8615)
* [RFC 9264: Linksets](https://www.rfc-editor.org/rfc/rfc9264)

---

## Appendix: Background on Agentic AI and Integration Patterns

### What Are Agentic AI Systems?

**Agentic AI systems** are autonomous software agents that can plan, reason, and execute complex multi-step tasks. These systems represent a new frontier in automation, capable of understanding natural language requests and breaking them down into actionable steps. For users with disabilities, these AI agents can serve as powerful assistive technologies, helping navigate digital environments and complete tasks that might otherwise be challenging.

### How AI Agents Learn to Use Semantic Destinations

A key question emerges: How do AI agents actually learn to use semantic markers exposed via Well-Known Destinations? The practical answer is through explicit tool integration rather than expecting agents to discover these patterns naturally.

#### Explicit Tool Integration

AI agents don't need to "learn" semantic markers through training data. Instead, they are explicitly equipped with Semantic Tools that understand Well-known Destinations:

**Tool Integration**: AI frameworks like MCP (Model Context Protocol) allow developers to provide agents with specific tools. Such tools can be used to discover destinations, navigate to destinations, or fetch content from destinations using Well-Known Destinations.

**Instruction-Following**: Modern LLMs excel at following instructions. When given tools that can "find destinations on this website" or "navigate to the contact page," they can coordinate these capabilities effectively without needing prior training.

### Integration Architecture Patterns

#### Core Integration Workflow

Agentic AI systems integrate with Semantic Web Tools through a standardized workflow pattern that works consistently across all websites implementing Well-known Destinations:

1. **Destination Discovery**: AI agents use Semantic Web Tools to discover available destinations on target webpage by using well-known destinations.

2. **Destination Selection and Planning**: Based on discovered destinations and user requirements, AI agents plan which destinations to visit and in what sequence to accomplish their tasks

3. **Semantic Navigation and Content Retrieval**: AI agents direct tools to navigate to selected destinations and retrieve page content for analysis

4. **LLM Processing and Synthesis**: AI agents process retrieved content using LLMs to extract relevant information, make decisions, and synthesize results across multiple sites

### Workflow Characteristics

**Uniform Approach**: The same Semantic Web Tool and workflow pattern works across all websites that implement Well-known Destinations, eliminating the need for site-specific customization.

**Semantic Reliability**: Navigation based on semantic destinations (`contact`, `help`, `accessibility-statement`) rather than fragile selectors ensures consistent operation even when sites update their designs.

**Clear Separation**: Semantic Web Tools handle technical navigation and content retrieval, while LLMs handle intelligent processing and decision-making.

This integration pattern enables AI agents to work reliably across any websites that implement Well-known Destinations, providing a standardized foundation for agentic web interaction.

#### Example Integration with Model Context Protocol (MCP)

The [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/specification) provides one example of how tools could integrate with AI systems. MCP is an open standard that enables AI applications (Agents) to securely connect with external tools and data sources.

**MCP Architecture Overview:**
MCP operates on a client-server model:
- **MCP Clients**: AI applications (agents)
- **MCP Servers**: Applications that expose tools and resources to AI systems
- **Protocol**: JSON-RPC over stdio, HTTP with SSE (Server-Sent Events), or WebSocket connections

**Semantic Web Tools as MCP Tools:**
Semantic Web Tools can be exposed through MCP servers, providing AI agents with standardized tools to access website.

**Example MCP Integration Workflow:**
When a user requests an AI agent to "find support options across my service providers," a system using MCP might follow this pattern:

1. The agent uses Semantic Web Tools to discover available destinations on each target website
2. Based on discovered destinations, the agent determines the optimal navigation strategy  
3. The agent navigates to relevant destinations and retrieves content
4. The AI processes the retrieved content to extract and synthesize information

#### Deployment Patterns with MCP: WebMCP vs. Traditional MCP Server

To address the practical challenges of browser interaction and session management, two primary architectural models emerge for deploying Semantic Web Tools:

1.  **Traditional MCP Server**:
    -   **How it Works**: In this model, the MCP server and its tools run on a remote server, completely independent of the user's browser. When a tool like `navigateToDestination` is invoked, the server makes a direct HTTP request to the target website.
    -   **Strengths**: Simple to deploy for public data retrieval.
    -   **Limitations**:
        -   **No Session Access**: It has no access to the user's browser session, cookies, or authentication state. It cannot perform actions on behalf of a logged-in user.
        -   **No Browser Interaction**: It cannot interact with the live browser environment, making it unsuitable for tasks that require triggering navigation or interacting with dynamic, client-side rendered applications.

2.  **WebMCP**:
    -   **How it Works**: In this model, the web page itself acts as an MCP Server. It uses a JavaScript API to define and expose "tools". An AI agent can discover and invokes these tools.
    -   **Strengths**:
        -   **Full Session Access**: Because the tools are part of the web page's code and execute in the browser, they automatically operate within the user's existing session, with full access to authentication state and page context.
        -   **Live Browser Interaction**: Tools can directly manipulate the DOM and call existing JavaScript functions, allowing the agent to drive the user interface collaboratively.
        
-   **Recommendation**: The WebMCP model is better suited for any use case involving authenticated operations, personalized content, or complex user-specific workflows. The traditional server-side model is only suitable for public data scenarios.

#### Sample Semantic Web Tools API

Semantic Web Tools expose a standardized set of capabilities that work uniformly across any website implementing Well-known Destinations. These tools support two distinct workflows:

**Workflow 1 - Direct Navigation**: User wants to visit a specific page (e.g., "take me to the help page")

**Workflow 2 - Information Extraction**: User wants specific information (e.g., "get the customer service phone number")

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
Description: Navigate to a semantic destination and retrieve page content for LLM processing
Parameters:
- url (string): Base page URL containing the destination reference  
- destinationType (string): Destination type (e.g., contact, help, accessibility-statement)
Returns: Navigation result with destination URL and extracted content for LLM analysis
```

**Usage Examples:**
- **Direct Navigation**: `navigateToDestination` for "take me to the contact page"
- **Information Extraction**: `fetchContentFromDestination` for "get the customer service phone number" (LLM processes the content to extract specific information)
