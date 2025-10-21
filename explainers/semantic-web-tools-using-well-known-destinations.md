# WAI-Adapt: Semantic Web Tools for Agentic AI Using Well-known Destinations Explainer

## Authors

- Abhinav Kumar (@abhina-kumar), SAP Labs India Pvt. Ltd.

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
  * [Example Integration: MCP Servers](#example-integration-mcp-servers)
- [Agentic AI Integration Patterns](#agentic-ai-integration-patterns)
- [Division of Responsibilities: LLM vs Semantic Web Tools](#division-of-responsibilities-llm-vs-semantic-web-tools)
- [Extended Destination Types for AI Tools](#extended-destination-types-for-ai-tools)
- [Open Questions](#open-questions)
- [References](#references)

## Introduction

**Agentic AI systems** are autonomous software agents that can plan, reason, and execute complex multi-step tasks on behalf of users. These systems represent a new frontier in automation, capable of understanding natural language requests and breaking them down into actionable steps. For users with disabilities, these AI agents can serve as powerful assistive technologies, helping navigate digital environments and complete tasks that might otherwise be challenging.

However, there's a fundamental challenge: while these AI agents excel at working with structured APIs, the vast majority of websites (70-80%) don't provide APIs for the functionality users actually need. This forces agents to fall back on brittle web scraping techniques that break whenever sites update their designs, particularly problematic for users who depend on consistent, reliable access to digital services.

### The Problem Today

When a user with cognitive disabilities asks an AI agent to "find contact information across my service providers," or when someone with motor impairments needs assistance navigating multiple websites, the agent faces a dilemma. For the 20-30% of sites with APIs, it can work reliably. For the remaining 70-80%, it must resort to fragile CSS selectors and HTML parsing that requires constant maintenance, causing unreliable experiences precisely when consistency matters most.

### Our Proposal

This explainer proposes extending the [Well-known Destinations](well-known-destinations.md) approach to bridge this gap through **Semantic Web Tools**, basically standardized software components that enable reliable website navigation using semantic identifiers rather than fragile technical selectors. This approach benefits both direct accessibility (helping users with disabilities navigate websites) and indirect accessibility (enabling AI assistive technologies to work reliably).

Instead of agents saying "find the element with class `.contact-info`", they would say "navigate to the 'contact' destination." This semantic approach works consistently across all compliant websites, creating reliable digital experiences for users who depend on assistive technologies and AI agents for web navigation.

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
- **Site-Specific Scripting**: Maintaining individual automation for each website which is a maintenance nightmare

### Real-World Pain Points

Consider an AI assistant tasked with "auditing accessibility statements across a company's website portfolio." For sites with APIs, this is straightforward. For the majority without APIs, the agent must:

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

Imagine the possibilities when AI agents can reliably navigate any website using semantic markers, particularly for users who face barriers in traditional web navigation:

**The Accessibility Compliance Assistant**: A disability rights advocate asks their AI assistant to "check accessibility statements across our 50 partner websites." Instead of manually visiting each site or maintaining fragile scrapers, the AI agent systematically discovers and analyzes `accessibility-statement` destinations across all sites in minutes, ensuring comprehensive accessibility monitoring.

**The Cognitive Support Assistant**: A user with cognitive disabilities facing issues with multiple service providers asks for help options. The AI agent discovers `contact` and `help` destinations across different platforms, presenting a comprehensive support landscape in a simplified, consistent format without breaking when sites redesign.

**The Motor Accessibility Aid**: A user with motor impairments wants to update their profile information across platforms but finds repeated navigation challenging. The AI agent navigates to `account-settings` destinations on each site, then guides the user through the updates with full context and control, reducing the physical navigation burden.

**The Accessibility Monitoring System**: Disability services organizations need regular checks of accessibility resources across their digital ecosystem. Semantic destinations enable automated discovery of `accessibility-statement` and `help` destinations without the maintenance burden of traditional scraping, ensuring accessibility information remains current and accessible.

These scenarios share a common pattern: **AI agents handle the discovery and navigation complexity, while humans maintain control over sensitive decisions and actions, this is particularly important for users who may need additional time or alternative interaction methods.**

## Building on Well-known Destinations

The beauty of this approach lies in its foundation: the [Well-known Destinations](well-known-destinations.md) proposal already provides the semantic infrastructure we need, with a core focus on accessibility.

**From Human Accessibility to AI-Assisted Accessibility**: Well-known Destinations were designed to help humans with accessibility needs find important pages quickly. This same semantic approach perfectly serves AI agents acting as assistive technologies—what helps humans with disabilities navigate also enables machines to provide consistent assistance.

**The Technical Foundation**: Websites already mark important destinations using standard HTML:

```html
<link rel="contact" href="/contact-us">
<link rel="help" href="/support">  
<link rel="accessibility-statement" href="/accessibility">
```

**Semantic Discovery**: Instead of guessing where functionality might be, AI agents can programmatically discover what each website offers through these semantic markers. This transforms unpredictable navigation into reliable discovery.

**Progressive Enhancement**: Sites don't need to rebuild anything, they simply add semantic markers to their existing pages. This creates a path for gradual ecosystem adoption without disrupting current workflows.

## How It Works: The Technical Foundation

The architecture is elegantly simple, built on three core capabilities:

**1. Destination Discovery**: AI agents enumerate available destinations by reading the semantic markers websites provide, either through HTML `<link>` elements or centralized linkset documents.

**2. Reliable Navigation**: Using discovered destinations, agents resolve semantic names like `contact` into actual URLs and navigate confidently to the right pages.

**3. Intelligent Content Processing**: Once at the destination, agents retrieve page content and hand it to Large Language Models (LLMs) for intelligent extraction and analysis.

This division creates a **separation of concerns**: simple tools handle the mechanical navigation, while sophisticated AI handles the intelligent understanding of content.

### Example: AI System Integration Through MCP

One way Semantic Web Tools can integrate with AI systems is through the [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/specification), an open standard that enables AI applications to securely connect with external tools and data sources. This represents one example of how such integration could work.

**Example Integration Workflow**: When a user requests an AI agent to "find support options across my service providers," a system using MCP might follow this pattern:

1. **Discovery Phase**: The agent uses Semantic Web Tools to discover available destinations on each target website
2. **Planning Phase**: Based on discovered destinations, the agent determines the optimal navigation strategy  
3. **Execution Phase**: The agent navigates to relevant destinations and retrieves content
4. **Analysis Phase**: The AI processes the retrieved content to extract and synthesize information

**Coordination Model**: This workflow emerges from LLM reasoning capabilities rather than pre-programmed algorithms. The AI agent uses language understanding to dynamically interpret requirements, assess available destinations, and adapt its approach based on what it discovers. The semantic foundation provided by Well-known Destinations enables this flexible, reasoning-based coordination to operate reliably across different websites.

This example integration pattern demonstrates how semantic web tools could work consistently across any collection of websites that implement Well-known Destinations, creating a standardized foundation for agentic web interaction. Other integration approaches and protocols could achieve similar results.

## Semantic Web Tools Architecture

### Semantic Web Tools Capabilities

Semantic Web Tools provide standardized capabilities that work uniformly across any website implementing Well-known Destinations:

#### Core Capabilities

* **Destination Discovery**: Enumerating all available Well-known Destinations for a given site through parsing `<link>` or `<a>` elements or accessing linkset documents
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

### Example Integration: MCP Servers

The [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/specification) provides one example of how semantic web tools could integrate with AI systems. MCP is an open standard that enables AI applications to securely connect to external systems and data sources, defining a standardized way for AI applications to interact with tools, resources, and services through a simple protocol.

#### MCP Architecture Overview

MCP operates on a client-server model:
- **MCP Clients**: AI applications (agents)
- **MCP Servers**: Applications that expose tools and resources to AI systems
- **Protocol**: Standardized JSON-RPC communication between clients and servers

#### Semantic Web Tools as MCP Tools

Semantic Web Tools can be exposed through MCP servers, providing AI agents with standardized access to website interaction capabilities. This integration allows AI systems to discover destinations, navigate to semantic endpoints, and retrieve content for LLM processing through the established MCP protocol.

#### Benefits of This Integration Approach

* **Standardized Interface**: AI agents can interact with Semantic Web Tools using established protocols like MCP
* **Ecosystem Leverage**: Can take advantage of existing tool ecosystems and integrations
* **Flexibility**: Other integration patterns and protocols could provide similar benefits

#### Example Deployment Patterns with MCP

**Browser-based Integration (WebMCP Example):**
One approach allows websites to expose tools directly through embedded JavaScript , where the website itself becomes a tool server endpoint.

**Standalone Server Integration (Traditional MCP Example):**
Another approach uses standalone applications that implement standardized semantic web tools. A single server can provide tools that work across multiple websites by taking the target website page URL as a parameter.

**Both Example Approaches Support Well-known Destinations:**
Since Well-known Destinations provides standardized discovery and navigation, different deployment models can implement the same standardized tools:

**Standalone Server Example:**
- Single server implements standardized tools like `discoverDestinations(url)`
- Tools are centralized but work across any compliant website
- Server handles the standardized discovery and navigation logic
- Easier to maintain consistency across the tool implementations

**Browser-based Integration Example:**
- Each website implements the same standardized tools locally
- Tools are distributed but follow the same semantic web standards


## Agentic AI Integration Patterns

Agentic AI systems can integrate with Semantic Web Tools through various approaches that leverage semantic destinations for reliable website interaction. While specific integration methods may vary, the core workflow pattern remains consistent regardless of the specific task or websites involved.

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

### Example: Semantic Web Tools API Specification

Semantic Web Tools could expose a standardized set of capabilities that work uniformly across any website implementing Well-known Destinations. The following shows example tool signatures that could be implemented through various integration approaches (such as MCP or other protocols):

#### Sample Semantic Web Tools

```
Tool: discoverDestinations
Description: Discover available semantic destinations on a page
Parameters:
- url (string): Page URL to discover destinations from
Returns: List of available destinations with types and URLs

Tool: navigateToDestination  
Description: Navigate to a semantic destination and retrieve page content
Parameters:
- url (string): Base page URL containing the destination reference
- destinationType (string): Destination type (e.g., contact, help, accessibility-statement)
Returns: Navigation result with destination URL and content
```

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

The Well-known Destinations proposal primarily serves human accessibility needs. For agentic AI systems operating as assistive technologies where APIs, schemas, and webhooks don't exist, a few additional destination types could be beneficial for accessibility support. These are examples of potential extensions that would benefit both direct accessibility and AI-assisted accessibility.

### Example Additional Destinations

* **`search`**: Site-specific search functionality when no search API is available—critical for users who rely on AI assistance to find information
* **`account-settings`**: User profile/account management pages—essential for users who need AI assistance managing their digital presence
* **`accessibility-preferences`**: User accessibility settings and preferences—enabling AI agents to help users configure accessible experiences

These destination types address common accessibility and agentic AI use cases that cannot be handled through existing Well-known Destinations and where sites lack APIs. Importantly, these additional destinations would directly benefit users with disabilities by providing clearer navigation paths to critical functionality while enabling AI assistive technologies to operate reliably.

As the ecosystem evolves and more accessibility-focused agentic AI use cases emerge, additional destination types may be identified and proposed through the standard development process.

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
