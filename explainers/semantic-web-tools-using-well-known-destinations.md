# WAI-Adapt: Semantic Web Tools for Agentic AI Using Well-known Destinations Explainer

## Authors

- Abhinav Kumar (@abhina-kumar), SAP Labs India Pvt. Ltd.
- Matthew Tylee Atkinson (@matatk), Samsung Electronics
- Lionel Wolberger (@lwolberg), Level Access
- Janina Sajka (@JaninaSajka), W3C Invited Experts

## Participate

* Issues: https://github.com/w3c/adapt/issues
* Discussions: https://github.com/w3c/adapt/discussions

## Contents

- [Introduction](#introduction)
- [Current State: The API Dependency Challenge](#current-state-the-api-dependency-challenge)
- [The Semantic Web Tools Solution](#the-semantic-web-tools-solution)
- [Scope and Limitations](#scope-and-limitations)
- [Real-World Applications](#real-world-applications)
- [Building on Well-known Destinations](#building-on-well-known-destinations)
- [How It Works: The Technical Foundation](#how-it-works-the-technical-foundation)
- [Semantic Web Tools Architecture](#semantic-web-tools-architecture)
  * [Semantic Web Tools Capabilities](#semantic-web-tools-capabilities)
  * [Discovery and Navigation Mechanisms](#discovery-and-navigation-mechanisms)
  * [MCP Server Integration](#mcp-server-integration)
- [Agentic AI Integration Patterns](#agentic-ai-integration-patterns)
- [Division of Responsibilities: LLM vs Semantic Web Tools](#division-of-responsibilities-llm-vs-semantic-web-tools)
- [Extended Destination Types for AI Tools](#extended-destination-types-for-ai-tools)
- [Open Questions](#open-questions)
- [References](#references)

## Introduction

**Agentic AI systems** are autonomous software agents that can plan, reason, and execute complex multi-step tasks on behalf of users. These systems represent a new frontier in automation, capable of understanding natural language requests and breaking them down into actionable steps.

However, there's a fundamental challenge: while these AI agents excel at working with structured APIs, the vast majority of websites (70-80%) don't provide APIs for the functionality users actually need. This forces agents to fall back on brittle web scraping techniques that break whenever sites update their designs.

**The Problem Today:**
When a user asks an AI agent to "find contact information across my service providers," the agent faces a dilemma. For the 20-30% of sites with APIs, it can work reliably. For the remaining 70-80%, it must resort to fragile CSS selectors and HTML parsing that requires constant maintenance.

**Our Proposal:**
This explainer proposes extending the [Well-known Destinations](well-known-destinations.md) approach to bridge this gap through **Semantic Web Tools**—standardized software components that enable reliable website navigation using semantic identifiers rather than fragile technical selectors.

**The Vision:**
Instead of agents saying "find the element with class `.contact-info`", they would say "navigate to the 'contact' destination." This semantic approach works consistently across all compliant websites, creating a new middle ground between full API development and unreliable scraping.

## Current State: The API Dependency Challenge

Today's agentic AI systems face a stark reality: they live in a two-tier world of website interaction.

**The Privileged Few (20-30% of sites):**
Sites like Twitter, GitHub provide robust APIs. Here, AI agents work beautifully—they can reliably access data, perform actions, and integrate seamlessly into workflows. These sites offer the structured, programmatic access that AI systems need.

**The Struggling Majority (70-80% of sites):**
Most websites—from local businesses to government agencies—don't provide APIs for basic functions like finding contact information, accessing help resources, or managing user accounts. This forces AI agents into a world of fragile workarounds.

### The Brittle Fallback Reality

When APIs aren't available, AI agents become digital archaeologists, excavating information through:

- **CSS Selector Archaeology**: Hunting for `.contact-info` classes that vanish with the next design update
- **HTML Structure Divination**: Parsing unstructured content that changes without notice  
- **Site-Specific Scripting**: Maintaining individual automation for each website—a maintenance nightmare

### Real-World Pain Points

Consider an AI assistant tasked with "auditing accessibility statements across our company's website portfolio." For sites with APIs, this is straightforward. For the majority without APIs, the agent must:

1. **Guess** where accessibility statements might be located
2. **Hope** the HTML structure hasn't changed since the last update
3. **Fail gracefully** when selectors break, leaving users with incomplete results

**The Core Problem**: We need a semantic bridge between the reliability of APIs and the universality of web interfaces.

| Approach | Coverage | Reliability | Maintenance Reality |
|----------|----------|-------------|---------------------|
| **APIs Only** | ~20-30% of sites | High | Low (when available) |
| **Traditional Scraping** | ~100% of sites | Very Low | Constant firefighting |
| **Semantic Web Tools** | Growing with adoption | High | Set-and-forget |

## The Semantic Web Tools Solution

Well-known Destinations offer an elegant solution to this challenge. Instead of websites needing to build full APIs, they can provide semantic signposts that AI agents can follow reliably.

**How It Works:**
Rather than an AI agent hunting for contact information using fragile selectors like `document.querySelector('.contact-page-link')`, it simply looks for the semantic marker: `rel="contact"`. This approach transforms brittle technical navigation into reliable semantic discovery.

## Scope and Limitations

### What Well-known Destinations Solve Well

* **Content Discovery**: Finding specific types of pages (help, contact, accessibility statements, product catalogs etc.)
* **Information Extraction**: Extracting data from destination pages
* **Consistent Navigation**: Standardized navigation patterns across different websites

### What Requires Additional Solutions

* **Complex Actions**: Multi-step workflows like password changes, account modifications, or transaction processing
* **Authenticated Operations**: Actions requiring user-specific authentication and authorization
* **Site-specific Workflows**: Unique business processes that don't map to standard destinations

### Human-in-the-Loop and Layered Approaches for Complex Scenarios

For complex scenarios like account management, a layered approach works best:

1. **Well-known Destinations**: Provide navigation to account management areas
2. **API Integration**: Use APIs where available for sensitive operations
3. **Human-in-the-Loop**: Include human oversight and intervention for sensitive or complex tasks

The primary approach for sensitive operations should be human-in-the-loop, where AI agents:
- Navigate to the relevant pages using semantic destinations
- Extract and present available options to users
- Hand control to humans for actual execution of sensitive tasks
- Provide guidance and context to facilitate user completion

## Real-World Applications

Imagine the possibilities when AI agents can reliably navigate any website using semantic markers:

**The Accessibility Auditor**: A compliance officer asks their AI assistant to "check accessibility statements across our 50 partner websites." Instead of manually visiting each site or maintaining fragile scrapers, the AI agent systematically discovers and analyzes `accessibility-statement` destinations across all sites in minutes.

**The Support Research Assistant**: A customer facing issues with multiple service providers asks for help options. The AI agent discovers `contact` and `help` destinations across different platforms, presenting a comprehensive support landscape without breaking when sites redesign.

**The Digital Estate Manager**: A user wants to update their profile information across platforms. The AI agent navigates to `account-settings` destinations on each site, then guides the user through the updates with full context and control.

**The Compliance Monitor**: A legal team needs regular checks of privacy policies across their digital ecosystem. Semantic destinations enable automated discovery and monitoring without the maintenance burden of traditional scraping.

These scenarios share a common pattern: **AI agents handle the discovery and navigation complexity, while humans maintain control over sensitive decisions and actions.**

## Building on Well-known Destinations

The beauty of this approach lies in its foundation: the [Well-known Destinations](well-known-destinations.md) proposal already provides the semantic infrastructure we need.

**From Human Accessibility to AI Navigation**: Well-known Destinations were designed to help humans with accessibility needs find important pages quickly. This same semantic approach perfectly serves AI agents—what helps humans navigate also helps machines understand.

**The Technical Foundation**: Websites already mark important destinations using standard HTML:

```html
<link rel="contact" href="/contact-us">
<link rel="help" href="/support">  
<link rel="accessibility-statement" href="/accessibility">
```

**Semantic Discovery**: Instead of guessing where functionality might be, AI agents can programmatically discover what each website offers through these semantic markers. This transforms unpredictable navigation into reliable discovery.

**Progressive Enhancement**: Sites don't need to rebuild anything—they simply add semantic markers to their existing pages. This creates a path for gradual ecosystem adoption without disrupting current workflows.

## How It Works: The Technical Foundation

The architecture is elegantly simple, built on three core capabilities:

**1. Destination Discovery**: AI agents enumerate available destinations by reading the semantic markers websites provide—either through HTML `<link>` elements or centralized linkset documents.

**2. Reliable Navigation**: Using discovered destinations, agents convert semantic names like `contact` into actual URLs and navigate confidently to the right pages.

**3. Intelligent Content Processing**: Once at the destination, agents retrieve page content and hand it to Large Language Models (LLMs) for intelligent extraction and analysis.

This division creates a **separation of concerns**: simple tools handle the mechanical navigation, while sophisticated AI handles the intelligent understanding of content.

### The AI Integration Story

The magic happens in how Semantic Web Tools integrate with AI systems through the [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/specification)—an open standard that allows AI applications to securely connect with external tools.

**The Workflow**: When a user asks an AI agent to "find support options across my service providers," here's what happens:

1. **Discovery Phase**: The agent uses Semantic Web Tools to discover what destinations each website offers
2. **Planning Phase**: Based on available destinations, the agent plans the optimal navigation strategy  
3. **Execution Phase**: The agent navigates to relevant destinations and retrieves content
4. **Analysis Phase**: AI processes the retrieved content to extract and synthesize useful information

This pattern works consistently across any collection of websites that implement Well-known Destinations, creating a standardized foundation for agentic web interaction.

## Semantic Web Tools Architecture

### Semantic Web Tools Capabilities

Semantic Web Tools provide standardized capabilities that work uniformly across any website implementing Well-known Destinations:

#### Core Capabilities

* **Destination Discovery**: Enumerating all available Well-known Destinations for a given site through parsing `<link>` elements or accessing linkset documents
* **Semantic Navigation**: Navigating to specific destinations using semantic identifiers rather than site-specific selectors
* **Content Retrieval**: Fetching page content from destination URLs and delivering it to LLMs for intelligent processing

**Benefits of Semantic Approach:**
- Single set of capabilities works across all compliant websites
- No site-specific customization or maintenance is required
- Consistent, predictable behavior for AI agents
- Leverages semantic web standards for reliability

**Note**: Content extraction and analysis is handled by LLMs, while form interactions typically require human-in-the-loop approaches for security and usability reasons.

### Discovery and Navigation Mechanisms

Semantic Web Tools leverage the discovery mechanisms already defined in the Well-known Destinations proposal:

#### HTML Link Element Parsing (Well-known Destinations Proposal)

The Well-known Destinations proposal specifies that websites mark destinations using `<link>` elements in the HTML head. Semantic Web Tools utilize this existing mechanism:

```html
<head>
  <link rel="accessibility-statement" href="/accessibility">
  <link rel="help" href="/support">
  <link rel="log-in" href="/sign-in">
  <link rel="products" href="/products">
</head>
```

#### Centralized Linkset Discovery (Well-known Destinations Alternative)

As an alternative approach explored in the Well-known Destinations proposal, sites implementing RFC 9264 Linksets can provide centralized destination discovery. Semantic Web Tools can leverage this approach when available:

```json
{
  "linkset": [
    {
      "anchor": "https://example.com/",
      "accessibility-statement": [{"href": "https://example.com/accessibility"}],
      "help": [{"href": "https://example.com/support"}],
      "log-in": [{"href": "https://example.com/sign-in"}]
    }
  ]
}
```

**Benefits of the Linkset Approach:**
- Single request to discover all destinations
- Centralized management of destination mappings
- Support for complex site hierarchies

#### Future Extensions

While building on the Well-known Destinations foundation, future extensions could define additional discovery mechanisms specifically optimized for automated tools:

```
GET /.well-known/destinations
```

This would return a standardized JSON format describing available destinations and any additional metadata needed for automated processing.

### MCP Server Integration

The [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/specification) is an open standard that enables AI applications to securely connect to external systems and data sources. MCP defines a standardized way for AI applications to interact with tools, resources, and services through a simple protocol.

#### MCP Architecture Overview

MCP operates on a client-server model:
- **MCP Clients**: AI applications (like Claude, ChatGPT, or custom AI agents)
- **MCP Servers**: Applications that expose tools and resources to AI systems
- **Protocol**: Standardized JSON-RPC communication between clients and servers

#### Semantic Web Tools as MCP Tools

Semantic Web Tools can be exposed through MCP servers, providing AI agents with standardized access to website interaction capabilities. This integration allows AI systems to discover destinations, navigate to semantic endpoints, and retrieve content for LLM processing through the established MCP protocol.

#### Benefits of MCP Integration

* **Standardized Interface**: AI agents can interact with Semantic Web Tools using standard MCP protocols
* **Ecosystem**: Leverage the growing MCP ecosystem of tools and integrations

## Agentic AI Integration Patterns

Agentic AI systems integrate with Semantic Web Tools through a straightforward workflow that leverages semantic destinations for reliable website interaction. The integration follows a consistent pattern regardless of the specific task or websites involved.

### Core Integration Workflow

#### 1. Destination Discovery
AI agents use the Semantic Web Tool to discover available destinations on target websites or pages by parsing well-known destination markers (`<link>` elements, linksets, or well-known URI endpoints).

#### 2. Destination Selection and Planning  
Based on discovered destinations and user requirements, AI agents plan which destinations to visit and in what sequence to accomplish their tasks.

#### 3. Semantic Navigation and Content Retrieval
AI agents direct the Semantic Web Tool to navigate to selected destinations and retrieve page content for analysis.

#### 4. LLM Processing and Synthesis
AI agents process the retrieved content using LLMs to extract relevant information, make decisions, and synthesize results across multiple sites.

### Workflow Characteristics

**Uniform Approach**: The same Semantic Web Tool and workflow pattern works across all websites that implement Well-known Destinations, eliminating the need for site-specific customization.

**Semantic Reliability**: Navigation based on semantic destinations (`contact`, `help`, `accessibility-statement`) rather than fragile selectors ensures consistent operation even when sites update their designs.

**Clear Separation**: Semantic Web Tools handle technical navigation and content retrieval, while LLMs handle intelligent processing and decision-making.

**Scalable Coordination**: AI agents can easily coordinate multi-site workflows by applying the same pattern across multiple websites simultaneously.

This integration pattern enables AI agents to work reliably across any collection of websites that implement Well-known Destinations, providing a standardized foundation for agentic web interaction.

## Division of Responsibilities: LLM vs Semantic Web Tools

The system operates through a clear separation of concerns between the LLM (reasoning/coordination) and Semantic Web Tools (technical execution):

### LLM Responsibilities
* **Task Planning**: Interpreting user requests and determining which websites and destinations are needed
* **Workflow Coordination**: Orchestrating the sequence of operations across multiple sites
* **Cross-site Analysis**: Synthesizing information from multiple sources into coherent responses
* **Error Handling**: Deciding how to respond when tools encounter failures or missing content
* **User Interaction**: Managing clarifications, progress updates, and result presentation

### Semantic Web Tools Responsibilities  
* **Destination Discovery**: Finding available Well-known Destinations on target websites
* **Navigation**: Converting semantic destination names to URLs and performing HTTP requests
* **Content Retrieval**: Fetching raw page content and passing it to LLMs for processing
* **Error Reporting**: Detecting and reporting technical failures (network errors, missing pages, authentication failures) to the LLM for decision-making

### Content Processing Strategy

Semantic Web Tools handle only the technical aspects of content retrieval, while LLMs handle all content processing:

- **Semantic Web Tools**: Navigate to destination URLs and fetch raw HTML content
- **LLMs**: Extract, clean, structure, and interpret the content based on the specific task requirements

This division ensures that the intelligent processing of unstructured web content is handled by LLMs, which can adapt to different page layouts, content types, and extraction requirements. Protocol issues like rate limiting, authentication failures, or access restrictions are reported to the LLM, which decides how to respond (retry, use alternative destinations, request human intervention, etc.).

## Extended Destination Types for AI Tools

The Well-known Destinations proposal primarily serves human accessibility needs. For agentic AI systems operating where APIs, schemas, and webhooks don't exist, a few additional destination types could be beneficial. These are examples of potential extensions, as more use cases may be discovered in the future.

### Example Additional Destinations

* **`search`**: Site-specific search functionality when no search API is available
* **`account-settings`**: User profile/account management pages

These destination types address common agentic AI use cases that cannot be handled through existing Well-known Destinations and where sites lack APIs. Importantly, these additional destinations would also benefit human users by providing clearer navigation paths to search functionality and account management.

As the ecosystem evolves and more agentic AI use cases emerge, additional destination types may be identified and proposed through the standard development process.

## Open Questions

The following questions remain open for extending Well-known Destinations to support agentic AI systems:

### Well-known Destinations Extensions

* **New Destination Types**: Should additional destinations like `search` and `account-settings` be standardized?
* **Discovery Optimization**: Should Well-known Destinations include a centralized discovery endpoint (e.g., `/.well-known/destinations`) to improve efficiency instead of requiring parsing of individual pages?

### Standardization Process

* **Governance Model**: How should new AI-relevant destination types be proposed, reviewed, and added to the standard?

## References

### Foundational Work

* [WAI-Adapt: Well-known Destinations Explainer](well-known-destinations.md)
* [Model Context Protocol (MCP) Specification](https://github.com/modelcontextprotocol/specification)
* [RFC 9264: Linksets](https://www.rfc-editor.org/rfc/rfc9264)
* [RFC 8615: Well-Known URIs](https://datatracker.ietf.org/doc/html/rfc8615)
