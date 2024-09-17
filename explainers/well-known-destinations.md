# WAI-Adapt: Well-known destinations Explainer

## Authors

- Matthew Tylee Atkinson (@matatk), Samsung Electronics

## Participate

* Issues: https://github.com/w3c/adapt/issues
* Discussions: https://github.com/w3c/adapt/discussions

## Contents

<!-- toc -->

## Introduction

<!-- _[Overall WAI-Adapt Explainer](README.md)_ -->

Web sites can contain a huge array of varied and engaging content. This content, and the means of navigating around it, can be presented in almost any way, which makes for tailored and compelling experiences. However, whilst there are several conventions when it comes to navigation, this variability can pose challenges to certain people&mdash;and user agents acting on their behalf.

This specification aims to address the challenge of making sites more easily navigable for both people (particularly those facing accessibility barriers) and machines. It does this by standardising machine-readable names for common page types. User Agents can then query as to which destinations are supported on a given site (or page of that site), and present this information in an appropriate way for the user.

The User Agent, or a User Agent extension, could provide an interface to allow the user to: view supported common pages using a method, and terminology, that is clear to them; and to request to visit common destination pages directly.

This specification builds upon several existing specifications and registries, as detailed in the [foundational work](#foundational-work) section below.

## Motivating Use Cases

* Supporting people facing cognitive accessibility barriers in navigating sites.

  - This includes mechanisms that can support clear signposting within a User Agent to "standard" or "common" areas of sites that users wish to visit&mdash;e.g. "log in", "products", or the site's accessibility statement.

  - This also includes supporting users and accessibility auditors in quickly discovering the accessibility statement for a site.

* Allowing UAs, or other machines, acting on behalf of users to also find common areas of sites.

## Out of scope

* Specifying the contents of well-known pages, nor the schema of any data to be found in one of the common areas of the site, when they are accessed by machines.

* Specifying the way in which supported well-known pages are displayed to the user.

* Specifying the interface within the UA (or UA extension) by which the user can navigate to supported well-known pages.

## User research

Our proposed "well-known destinations" come from work done by the [Cognitive and Learning Disabilities Accessibility Task Force](https://www.w3.org/WAI/GL/task-forces/coga/).

> **TODO:** Include excerpts from/pointers to Content Usable, or other COGA resources, that showcase barriers that may be created by present IA/navigation designs.

### Proposed destinations

> **TODO:** This is not a complete list&mdash;we are consulting with COGA to update the [destinations that Adapt inherited from COGA](https://raw.githack.com/w3c/adapt/CR-content-2022-07-26/content/index.html#values-0).

* `accessibility` (for the site's [accessibility statement](https://www.w3.org/WAI/planning/statements/))

* `change-password` (as per [A Well-known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/))

* `help` (for the site's main help landing page)

* `log-in`

* `log-out`

* `products` (for the site's main product section's landing page)

* `search` (intended for a dedicated search page; a [`search` landmark region](https://www.w3.org/TR/wai-aria-1.2/#search) would be used on any page that contains a search form)

## Well-known destinations: technical requirements

We are investigating two technical approaches to supporting the above user needs. Both approaches have common elements. All approches that would solve these user needs must provide the following.

* A well-defined (or customisable) notion of the scope of any particular site.

* A representation of the namespace of well-known destinations proposed above.

* A mechanism for discovering all well-known destinations supported by a site&mdash;to be used when a UA first visits a site on behalf of the user. In order to do this efficiently, it must be possible to make this query in a single HTTP request. The results would be available to the user via the UI of the UA.

* A procedure for visiting a well-known destination directly (when the user activates the interface in the UA).

* A mechanism by which a well-known destination would be updated (by the content author).

* Means to identify when a link on a page takes the user to a sub-page of a well-known destination page. E.g. a link to the "help on logging in" page (as opposed to the main "help" section landing page, which is where the well-known destination alone would take the user).

* Means to demarcate an element on the destination page that provides the destination content.

### Notes on linking to sub-pages of a well-known destination

Sometimes, there may be a standard activity, e.g. "Get help information", that applies to the specific content on a particular page (or part of a page)&mdash;an example may be getting help on logging in (as opposed to getting help in general). In these cases, we cannot use a single well-known destination&mdash;that would only point to the main "help" section's landing page.

In this case, we need a way to indicate when a link takes the user to a page that falls under a well-known destination. This information could then be rendered in an appropriate way for the user, e.g:

* Being added to the extension's pop-up, in a page-specific section.

* Having a symbol or some other highlight added to the link itself in the page, to direct the user's attention to it.

## Option 1: Well-known URIs, and HTML link types

This approach builds on:

* Well-known URIs to identify destination pages&mdash;with a small extension (detailed below) for efficient polling of destinations; and

* HTML link relation types to identify when links point to well-known destinations.

### Defining a site

Well-known URLs work on the basis of _origins_.

If a site is organised in such a way to have sub-sites that are at subdomains, this will work as intended&mdash;the destinations for each sub-site will be reflected separately.

However, if the overall site is organised such that sub-sites are rooted at different URL paths, this will not be the case.

> [!NOTE]
> We are investigating:
>
> * How much of a barrier this may be.
>
>   - How many sites may be affected.
>
>   - How problematic it may be for users to have to visit a landing page that provides links to sub-site-specific pages.
>
> * Ways that this could be overcome (other than having the well-known destination point to a landing page that provides onward links to sub-site pages).

### The well-known destination namespace

As there are several URLs that could be provided by a site, they will be namespaced under the following parent well-known URL.

    /.well-known/ia/

Under this namespace are the following proposed URLs.

* `/.well-known/ia/accessibility`

* `/.well-known/ia/change-password` (as per [A Well-Known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/), but moved under the new namespace)

* `/.well-known/ia/help`

* `/.well-known/ia/log-in`

* `/.well-known/ia/log-out`

* `/.well-known/ia/products`

* `/.well-known/ia/search` (intended for a dedicated search page; a [`search` landmark region](https://www.w3.org/TR/wai-aria-1.2/#search) would be used on any page that contains a search form)

#### Naming the namespace

The namespace has been specified as `/.well-known/ia/`, with "ia" standing for "information architecture". This term matches clauses 2, 4, and 8 of [the definition of "information architecture" as given by Wikipedia](https://en.wikipedia.org/wiki/Information_architecture#Definition). Clause 2 states:

> The art and science of organizing and labeling web sites, intranets, online communities, and software to support findability and usability.

Other options instead of "ia" were considered, including "information-architecture", "structure", and others. However "ia" was both felt to be accurate, and is more concise than the other alternatives.

### Enumerating well-known destinations

> [!NOTE]
> This section describes a behavior that would need to be specified as an extension to Well-known URIs.

When a UA requests the root URL for the information architecture namespace:

    /.well-known/ia/

A JSON string is returned that represents the list of well-known destinations this site provides. For example, if the site provided a page to allow users to sign in to their accounts, and an accessibility statement, then the returned JSON string would be:

```json
["accessibility","log-in"]
```

The UA would then be able to present this information to the user in some way. We envisage that, initially, this could be done via a browser extension that provides a pop-up (or sidebar) that would list the available destinations on the site in a localised manner for the user. In this case, that list might be:

* Accessibility statement

* Log in

> **TODO:** Seek input on serialisation format during wide review.

### Visiting a well-known destination directly

This would normally happen when the user activates a control in the UA's (or UA extension's) interface to trigger visiting the particular destination.

1. UA requests the well-known URL directly.

2. Depending on whether the URL exists&hellip;

   1. **If the URL exists:** a redirect is given, and the actual page loads normally (assuming the "real" URL given in the redirect is valid).

   2. **If the URL does not exist:** A 404 response is received. In this case, the UA would display the 404 page&hellip;this is unlikely to happen in normal use (because supported destinations would've already been queried), and may indicate that the site is mis-configured.

### Updating a well-known destination

When the "real" URL to which a well-known URL points is changed (because the page is moved/deleted), then the well-known URL redirect must be updated, or removed entirely.

### Expressing when a link points to part of a well-known destination

> **TODO:** complete this section.

### Demarcating destination content

> **TODO:** complete this section.

## Option 2: Linksets, and HTML link types

This approach builds on:

* Linksets to identify destination pages&mdash;with a small extension (detailed below) for efficient polling of destinations; and

* HTML link relation types to identify when links point to well-known destinations.

### Defining a site

> [!NOTE]
> This section describes a behavior that would need to be specified as an extension to Well-known URIs.

A linkset document (i.e. the JSON serialization) would be created for the site.

> **TODO:** complete this section.

> [!NOTE]
> We could actually serve the linkset document from a Well-known URI, to avoid the need for every HTML page to link to the linkset.

### The well-known destination namespace

> **TODO:** complete this section.

### Enumerating well-known destinations

> **TODO:** complete this section.

> [!NOTE]
> We could actually serve the linkset document from a Well-known URI, to avoid the need for every HTML page to link to the linkset.

> [!NOTE]
> We need to investigate how, on a large site, the linkset documents could be split up

### Visiting a well-known destination directly

> **TODO:** complete this section.

### Updating a well-known destination

> **TODO:** complete this section.

### Expressing when a link points to part of a well-known destination

> **TODO:** complete this section.

### Demarcating destination content

> **TODO:** complete this section.

## Detailed design discussion

### Cacheing

> **TODO:** Fill in the details here. Simplistically, the response to the namespace request can be cached like normal. The UA doesn't need to request it every time. We must seek wide review on sensible values here.

## Considered alternatives

### Sitemaps

[Sitemaps](https://www.sitemaps.org/) are intended to solve different problems than this work.

* Sitemaps are intended to enumerate all major (and possibly minor) pages; our goal here is to highlight specific common pages that may be provided.

* Sitemaps do not give standard names to certain types of pages; our goal here is to semantically identify the purpose of specific pages, so that the UA can present this information to the user, and so that machines can reach certain pages.

It does not seem like a good fit to try to extend the format of sitemaps to accommodate these requirements.

### Using `rel` attribute values alone

Using `rel` attribute values is part of the proposed spec&mdash;for cases where deep links may be provided into an overall well-known section (e.g. help on a specific topic).

It would be possible to use _only_ `rel` values to highlight well-known destinations (if they were applied to links to the top-level destination landing pages, and there was a way to denote that a link was to the top-level destination landing page), but this would have the disadvantage that the overall destinations for a particular site could not be determined, nor presented to the user, in a simple and robust way. The user could only discover them if they landed on the right pages.

This would pose the risk that the interface presented by the UA would not give a complete picture of what is available on the site, and thus either not be of great use, or&mdash;worse&mdash;be actively confusing for people to use.

> **TODO:** Open questions:
>
> * How often would footer links cover this? (If often, does that negate the need for this spec?)
>
> * What is the performance cost of parsing all those `rel` attributes every time? (This would be required if the `rel` approach were to be used at all.)

## Stakeholder feedback/opposition

> **TODO:** We are actively involved in early discussions with some stakeholders, and will seek wide review as soon as possible.

## References \& acknowledgements

* Adapt TF participants

* MW?

* Abhinav

* Léonie Watson

### Foundational work

#### Destinations

* [Destinations that Adapt inherited from COGA](https://raw.githack.com/w3c/adapt/CR-content-2022-07-26/content/index.html#values-0)

> **TODO:** The destinations are under review.

#### Well-known URLs

* [IETF's Well-Known URIs RFC](https://www.rfc-editor.org/rfc/rfc8615)

* [IANA's well-known URI registry](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml)

* W3C's [A Well-Known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/) specification (the URL for which is lodged in IANA's registry)

#### Linksets

> **TODO:** Add this section.

#### Link types/relations

* HTML's [standard link types](https://html.spec.whatwg.org/multipage/links.html#linkTypes)

* Extended link types (also known as "link relations"):

  - [Link types managed by the Microformats project](https://html.spec.whatwg.org/multipage/links.html#other-link-types)

  - [Link types anaged by IANA](https://www.iana.org/assignments/link-relations/link-relations.xhtml)
