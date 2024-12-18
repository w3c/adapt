# WAI-Adapt: Well-known destinations Explainer

## Authors

- Matthew Tylee Atkinson (@matatk), Samsung Electronics

## Participate

* Issues: https://github.com/w3c/adapt/issues
* Discussions: https://github.com/w3c/adapt/discussions

## Contents

<!-- toc -->

- [Introduction](#introduction)
- [Motivating Use Cases](#motivating-use-cases)
- [Out of scope](#out-of-scope)
- [User research](#user-research)
- [Well-known destinations: technical requirements](#well-known-destinations-technical-requirements)
- [Option 1: Well-known URIs, and HTML link types](#option-1-well-known-uris-and-html-link-types)
  * [The well-known destination namespace](#the-well-known-destination-namespace)
  * [Defining a site](#defining-a-site)
  * [Enumerating well-known destinations](#enumerating-well-known-destinations)
  * [Visiting a well-known destination directly](#visiting-a-well-known-destination-directly)
  * [Updating a well-known destination](#updating-a-well-known-destination)
  * [Expressing when a link points to part of a well-known destination](#expressing-when-a-link-points-to-part-of-a-well-known-destination)
  * [Demarcating destination content](#demarcating-destination-content)
- [Option 2: Linksets, and HTML link types, and one Well-known URI](#option-2-linksets-and-html-link-types-and-one-well-known-uri)
  * [The well-known destination namespace](#the-well-known-destination-namespace-1)
  * [Defining a site](#defining-a-site-1)
  * [Enumerating well-known destinations](#enumerating-well-known-destinations-1)
  * [Visiting a well-known destination directly](#visiting-a-well-known-destination-directly-1)
  * [Updating a well-known destination](#updating-a-well-known-destination-1)
  * [Expressing when a link points to part of a well-known destination](#expressing-when-a-link-points-to-part-of-a-well-known-destination-1)
  * [Demarcating destination content](#demarcating-destination-content-1)
- [Security \& Privacy considerations](#security--privacy-considerations)
- [Considered alternatives](#considered-alternatives)
  * [Sitemaps](#sitemaps)
  * [Using `rel` attribute values alone](#using-rel-attribute-values-alone)
- [Stakeholder feedback/opposition](#stakeholder-feedbackopposition)
- [References \& acknowledgements](#references--acknowledgements)
  * [Foundational work](#foundational-work)
    + [Destinations](#destinations)
    + [Well-known URLs](#well-known-urls)
    + [Linksets](#linksets)
    + [Link types/relations](#link-typesrelations)

<!-- tocstop -->

## Introduction

<!-- _[Overall WAI-Adapt Explainer](README.md)_ -->

Web sites can contain a huge array of varied and engaging content. This content, and the means of navigating around it, can be presented in almost any way, which makes for tailored and compelling experiences. However, whilst there are several conventions when it comes to navigation, this variability can pose challenges to certain people&mdash;and user agents acting on their behalf.

This specification aims to address the challenge of making sites more easily navigable for both people (particularly those facing accessibility barriers) and machines. It does this by standardising machine-readable names for common page types. User Agents can then query as to which destinations are supported on a given site (or page of that site), and present this information in an appropriate way for the user.

The User Agent, or a User Agent extension, could provide an interface to allow the user to: view supported common pages using a method, and terminology, that is clear to them; and to request to visit common destination pages directly.

This specification builds upon several existing specifications and registries, as detailed in the [foundational work](#foundational-work) section below.

The motivating use cases, "option 1" approach (using Well-known URIs), and an example end-user UI, are depicted in [our Well-known destinations AC 2024 lightning talk](https://w3c.github.io/adapt/presentations/ac2024/).

## Motivating Use Cases

* Supporting people facing cognitive accessibility barriers in navigating sites.

  - This includes mechanisms that can support clear signposting within a User Agent to "standard" or "common" areas of sites that users wish to visit&mdash;e.g. "log in", "products", or the site's accessibility statement.

  - This also includes supporting users and accessibility auditors in quickly discovering the accessibility statement for a site.

* Allowing UAs, or other machines, acting on behalf of users to also find common areas of sites.

## Out of scope

* Specifying the contents of well-known pages, nor the schema of any data to be found in one of the common areas of the site, when they are accessed by machines.

* Specifying the way in which supported well-known pages are displayed to the user.

* Specifying the interface within the UA (or UA extension) by which the user can navigate to supported well-known pages.

Though out of scope, an proof-of-concept UI for enumerating a site's well-known destinations is depicted below.

![A fictional ACME Inc. home page, with the extension pop-up open, showing 6 buttons, each containing emoji and accompanying text names for the well-known destinations offered by the site: home, accessibility statement, contact, help, log in, and products.](../presentations/ac2024/ext02.png)

## User research

Our proposed "well-known destinations" come from work done by the [Cognitive and Learning Disabilities Accessibility Task Force](https://www.w3.org/WAI/GL/task-forces/coga/).

> [!NOTE]
> This is not a complete list&mdash;we are consulting with COGA to update the [destinations that the WAI-Adapt TF inherited from COGA](https://raw.githack.com/w3c/adapt/CR-content-2022-07-26/content/index.html#values-0).

An illustrative set of proposed well-known destinations is as follows...

* `accessibility-statement` (for the site's [accessibility statement](https://www.w3.org/WAI/planning/statements/))

* `change-password` (as per [A Well-known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/))

* `help` (for the site's main help landing page)

* `log-in`

* `products` (for the site's main product section's landing page)

* `search` (intended for a dedicated search page; a [`search` landmark region](https://www.w3.org/TR/wai-aria-1.2/#search) would be used on any page that contains a search form)

## Well-known destinations: technical requirements

We are investigating two technical approaches to supporting the above user needs. Both approaches have common elements. All approches that would solve these user needs must provide the following.

* A way to denote the scope of any particular site (or sub-site).

* A way to represent each well-known destination proposed above.

* A mechanism for discovering all well-known destinations supported by a site&mdash;to be used when a UA first visits a site on behalf of the user. In order to do this efficiently, it must be possible to make this query in a single HTTP request. The results would be available to the user via the UI of the UA.

* A procedure for visiting a well-known destination directly (when the user activates the interface in the UA).

* A mechanism by which a well-known destination would be updated (by the content author).

* Means to identify when a link on a page takes the user to a sub-page of a well-known destination page. E.g. a link to the "help on logging in" page (as opposed to the main "help" section landing page, which is where the well-known destination alone would take the user).

The following features are also very desirable, but may be deferred to a later version of the spec:

* Means to demarcate an element on the destination page that provides the destination content.

## Option 1: Well-known URIs, and HTML link types

This approach builds on:

* Well-known URIs to identify destination pages&mdash;with a small extension (detailed in [enumerating well-known destinations](#enumerating-well-known-destinations) below) to support efficient polling of destinations; and

* HTML link relation types to identify when links point to well-known destinations.

### The well-known destination namespace

As there are several destinations that could be provided by a site, they will be namespaced under the following parent well-known URL.

    /.well-known/ia/

Under this namespace are the following proposed URLs (the purpose of each is given in the [user research](#user-research) section above).

* `/.well-known/ia/accessibility-statement`

* `/.well-known/ia/change-password`

* `/.well-known/ia/help`

* `/.well-known/ia/log-in`

* `/.well-known/ia/products`

* `/.well-known/ia/search`

The namespace has been specified as `/.well-known/ia/`, with "ia" standing for "information architecture". This term matches clauses 2, 4, and 8 of [the definition of "information architecture" as given by Wikipedia](https://en.wikipedia.org/wiki/Information_architecture#Definition). Clause 2 states:

> The art and science of organizing and labeling web sites, intranets, online communities, and software to support findability and usability.

Other options instead of "ia" were considered, including "information-architecture", "structure", and others. However "ia" was both felt to be accurate, and is more concise than the other alternatives.

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

### Enumerating well-known destinations

> [!IMPORTANT]
> This section describes a behavior that would need to be specified as an extension to Well-known URIs.

When a UA requests the root URL for the information architecture namespace:

    /.well-known/ia/

A JSON string is returned that represents the list of well-known destinations this site provides. For example, if the site provided a page to allow users to sign in to their accounts, and an accessibility statement, then the returned JSON string would be:

```json
["accessibility-statement","log-in"]
```

The UA would then be able to present this information to the user in some way. We envisage that, initially, this could be done via a browser extension that provides a pop-up (or sidebar) that would list the available destinations on the site in a localised manner for the user. In this case, that list might be:

* Accessibility statement

* Log in

### Visiting a well-known destination directly

This would normally happen when the user activates a control in the UA's (or UA extension's) interface to trigger visiting the particular destination.

1. UA requests the well-known URL directly.

2. Depending on whether the URL exists&hellip;

   1. **If the URL exists:** a redirect is given, and the actual page loads normally (assuming the "real" URL given in the redirect is valid).

   2. **If the URL does not exist:** A 404 response is received. In this case, the UA would display the 404 page&hellip;this is unlikely to happen in normal use (because supported destinations would've already been queried), and may indicate that the site is mis-configured.

### Updating a well-known destination

When the "real" URL to which a well-known URL points is changed (because the page is moved/deleted), then the well-known URL redirect must be updated, or removed entirely.

### Expressing when a link points to part of a well-known destination

A link could be decorated with a `rel` attribute value that corresponds to the applicable destination.

The UA will know if this link points to the root of the well-known destination (e.g. the "Help" landing page, vs "Help on logging in") becuase it knows the URL of the root of the well-known destination, via the discovery process above.

### Demarcating destination content

> [!NOTE]
> We have not completed this feature yet.

## Option 2: Linksets, and HTML link types, and one Well-known URI

This approach builds on:

* Linksets to identify destination pages&mdash;with a small "extension" (or, rather, difference in how the linkset is interpreted&mdash;detailed in [defining a site](#defining-a-site-1) below) for defining sub-sites;

* A single Well-known URI from which the linkset would be served; and

* HTML link relation types to identify when links point to well-known destinations.

### The well-known destination namespace

Each destination is part of a vocabulary. As there are several destinations that could be provided by a site, they will be namespaced under a root vocabulary namespace, for example (taking inspiration from GS1's vocabulary)...

    https://w3.org/voc/ia/

Under this namespace are the following proposed URLs (the purpose of each is given in the [user research](#user-research) section above).

* `https://w3.org/voc/ia/accessibility-statement`

* `https://w3.org/voc/ia/change-password`

* `https://w3.org/voc/ia/help`

* `https://w3.org/voc/ia/log-in`

* `https://w3.org/voc/ia/products`

* `https://w3.org/voc/ia/search`

The namespace has been specified as `https://w3.org/voc/ia/`, with "ia" standing for "information architecture". This term matches clauses 2, 4, and 8 of [the definition of "information architecture" as given by Wikipedia](https://en.wikipedia.org/wiki/Information_architecture#Definition). Clause 2 states:

> The art and science of organizing and labeling web sites, intranets, online communities, and software to support findability and usability.

Other options instead of "ia" were considered, including "information-architecture", "structure", and others. However "ia" was both felt to be accurate, and is more concise than the other alternatives.

### Defining a site

> [!IMPORTANT]
> This section describes a semantic that would need to be interpreted differently when interpreting a "well-known" linkset.

A linkset document (i.e. the JSON serialization) would be created for the site.

For example, the linkset for a simple site (with no sub-sites), which supports three well-known destinatiions (`accessibility-statement`, `help`, and `log-in`), may be represented as follows.

```json
{ "linkset":
  [
    { "anchor": "https://acme.biz/",
      "https://w3.org/voc/accessibility-statement": [
        { "href": "https://acme.biz/accessibility" }
      ],
      "https://w3.org/voc/help": [
        { "href": "https://acme.biz/support" }
      ],
      "https://w3.org/voc/log-in": [
        { "href": "https://acme.biz/sign-in" }
      ]
    }
  ]
}
```

Note that the linkset standard allows us to provide links to equivalent pages in other human languages; this is not shown here, for brevity.

Also note that a **UA that supports well-known destinations would interpret the `anchor` field in a specific way:** Well-known destinations are intented to be (sub-)site-wide, so the links relating to the single given `anchor` above would apply to all other URLs that start with the `anchor`'s URL.

A more complex site, which is hosted at one origin, but provides two micro-sites, could be coded as follows. The following example linkset represents a hotel's website that has the following structure.

* A "root" site (for the hotel as a whole) at `acme.hotel`.

* The main hotel website provides an overall `accessibility-statement` and `log-in` destination, and a `contact` destination for the hotel (mainly intended for room bookings).

* There is a "restaurant" micro-site that has its own `contact` page (but inherits the root site's `accessibility-statement` and `log-in` pages).

* There is a "gym" micro-site that has its own `contact` page (but inherits the root site's `accessibility-statement` and `log-in` pages).

```json
{ "linkset":
  [
    { "anchor": "https://acme.hotel/",
      "https://w3.org/voc/accessibility-statement": [
        { "href": "https://acme.hotel/accessibility" }
      ],
      "https://w3.org/voc/contact": [
        { "href": "https://acme.hotel/contact" }
      ],
      "https://w3.org/voc/log-in": [
        { "href": "https://acme.hotel/sign-in" }
      ]
    },
    { "anchor": "https://acme.hotel/restaurant",
      "https://w3.org/voc/contact": [
        { "href": "https://acme.hotel/restaurant/contact" }
      ]
    },
    { "anchor": "https://acme.hotel/gym",
      "https://w3.org/voc/contact": [
        { "href": "https://acme.hotel/gym/contact" }
      ]
    }
  ]
}
```

In this case, the UA would need to interpret the URL structure of the linkset as a tree, and ensure that, when the user is visiting the gym's sub-site, for example, the gym's `contact` page is recognised, but the overall root (hotel) site's `accessibility-statement` would apply.

> [!NOTE]
> The way that the UA presents the underlying tree structure of destinations across the root and sub-sites is out of scope. We envisage a range of UAs, or user preference settings, being created to cater for differing user needs.

### Enumerating well-known destinations

The first time the user visits the origin, the linkset for the origin, and sub-sites, would be fetched from a well-known URI, such as `/.well-known/ia/linkset`.

> [!NOTE]
> We need to investigate how, on a large site, the linkset documents could be split up to improve performance and/or ease of editing, in the event different teams work on different sub-sites.

### Visiting a well-known destination directly

* The user selects the well-known destination in the UI of their UA.

* The corresponding URL is loaded.

If a destination isn't supported, the UI is expected to _not_ include it.

### Updating a well-known destination

The content author would need to update the linkset file, and replace it on the server.

> [!NOTE]
> We need to investigate how, on a large site, the linkset documents could be split up to improve performance and/or ease of editing, in the event different teams work on different sub-sites.

### Expressing when a link points to part of a well-known destination

A link could be decorated with a `rel` attribute value that corresponds to the applicable destination.

The UA will know if this link points to the root of the well-known destination (e.g. the "Help" landing page, vs "Help on logging in") becuase it knows the URL of the root of the well-known destination, via the discovery process above.

### Demarcating destination content

> [!NOTE]
> We have not completed this feature yet.

## Security \& Privacy considerations

> [!NOTE]
> We have not completed this section yet.

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

> [!NOTE]
> Open questions:
>
> * How often would footer links cover this? (If often, does that negate the need for this spec?)
>
> * What is the performance cost of parsing all those `rel` attributes every time? (This would be required if the `rel` approach were to be used at all.)

## Stakeholder feedback/opposition

> [!NOTE]
> We are actively involved in early discussions with some stakeholders, and will seek wide review as soon as possible.

## References \& acknowledgements

* The WAI-Adapt TF

* Abhinav Kumar

* Léonie Watson

* Phil Archer

* The COGA TF

### Foundational work

#### Destinations

* [Destinations that Adapt inherited from COGA](https://raw.githack.com/w3c/adapt/CR-content-2022-07-26/content/index.html#values-0)

> [!NOTE]
> As mentioned above, the destinations are under review.

#### Well-known URLs

* [IETF's Well-Known URIs RFC](https://www.rfc-editor.org/rfc/rfc8615)

* [IANA's well-known URI registry](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml)

* W3C's [A Well-Known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/) specification (the URL for which is lodged in IANA's registry)

#### Linksets

* [IETF's Linksets RFC](https://www.rfc-editor.org/rfc/rfc9264)

* [GS1's linkset visualisation demo](https://gs1.github.io/linkset/)

#### Link types/relations

* HTML's [standard link types](https://html.spec.whatwg.org/multipage/links.html#linkTypes)

* Extended link types (also known as "link relations"):

  - [Link types managed by the Microformats project](https://html.spec.whatwg.org/multipage/links.html#other-link-types)

  - [Link types anaged by IANA](https://www.iana.org/assignments/link-relations/link-relations.xhtml)
