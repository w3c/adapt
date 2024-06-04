# Well-known destinations

**or: Using well-known URLs and link types for accessible, machine-readable information architecture**

## Authors

- Matthew Tylee Atkinson (@matatk), Samsung Electronics

## Introduction

Web sites can contain a huge array of varied and engaging content. This content, and the means of navigating around it, can be presented in almost any way, which makes for tailored and compelling experiences. However, whilst there are several conventions when it comes to navigation, this variability can pose challenges to certain people&mdash;and user agents acting on their behalf.

This specification aims to address the challenge of making sites more easily navigable for both people (particularly those facing accessibility barriers) and machines. It does this by standardising machine-readable names for common page types. User Agents can then query as to which destinations are supported on a given site (or page of that site), and present this information in an appropriate way for the user.

The User Agent, or a User Agent extension, could provide an interface to allow the user to: view supported common pages using a method, and terminology, that is clear to them; and to request to visit common destination pages directly.

This specification builds upon several existing specifications and registries, as detailed in the [foundational work](#foundational-work) section below.

## Motivating Use Cases

* Supporting people facing cognitive accessibility barriers in navigating sites.

  - This includes mechanisms that can support clear signposting within a User Agent to "standard" or "common" areas of sites that users wish to visit&mdash;e.g. "log in", "products", or the site's accessibility statement.

  - This also includes supporting users and accessibility auditors in quickly discovering the accessibility statement for a site.

* Allowing UAs, or other machines, acting on behalf of users to also find common areas of sites.

## Non-goals

* Specifying the contents of well-known pages, nor the schema of any data to be found in one of the common areas of the site, when they are accessed by machines.

* Specifying the way in which supported well-known pages are displayed to the user.

* Specifying the interface within the UA (or UA extension) by which the user can navigate to supported well-known pages.

## User research

Our "common destinations" come from work done by the [Cognitive and Learning Disabilities Accessibility Task Force](https://www.w3.org/WAI/GL/task-forces/coga/).

> **TODO:** Include excerpts from/pointers to Content Usable, or other COGA resources, that showcase barriers that may be created by present IA/navigation designs.

## Well-known URLs for common pages

Sites often provide specific pages that house certain types of content, or provide certain functionality. The main aim of this specification is to make those pages easier to find, for users and machines. This is achieved by standardising some "common destinations" that sites may offer.

People visiting the site may face a range of accessibility or other barriers that make this navigation harder. Standardising some common destinations can help UAs provide a clearer interface to help people navigate.

Also, by virtue of standardising those "common destinations", we can help users avoid confusion over terms they may find unfamilar. E.g. some users may be confused by "sign in" if they were expecting "log in": with a semantic foundation, these terms can be expresssed to users in a way that makes sense to them.

This part of the specification builds on the existing standards and registries listed in the [well-known URLs](#well-known-urls) subsection below.

### Well-known URL namespace

As there are several URLs that could be provided by a site, they will be namespaced under the following parent well-known URL.

    /.well-known/ia/

Under this namespace are the following proposed URLs.

> **TODO:** This is not a complete list&mdash;we are consulting with COGA to update the [destinations that Adapt inherited from COGA](https://raw.githack.com/w3c/adapt/CR-content-2022-07-26/content/index.html#values-0).

* `/.well-known/ia/accessibility`

* `/.well-known/ia/change-password` (as per [A Well-Known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/), but moved under the new namespace)

* `/.well-known/ia/help`

* `/.well-known/ia/log-in`

* `/.well-known/ia/log-out`

* `/.well-known/ia/products`

* `/.well-known/ia/search` (intended for a dedicated search page; a [`search` landmark region](https://www.w3.org/TR/wai-aria-1.2/#search) would be used on any page that contains a search form)

#### Criteria for inclusion in the namespace

> **TODO:** What qualifies a URL as being worthy of being added?
> Some potential answers:
>
> * We start with the [destinations that Adapt already inherited from COGA](https://raw.githack.com/w3c/adapt/CR-content-2022-07-26/content/index.html#values-0) (with some clean-up/modernisation).
>
> * We see what the community comes up with, and standardize what has consensus (a la EPUB). But...
>
> * We need some ground rules as to what makes a suitable well-known "ia" destination.
>
>   - It must refer to an important piece of content, or task, that is not specific to the subject matter of the site.

### Enumeration of common destinations

The primary goal of this specification is to support UAs in informing users which common destinations are available across the site as a whole. In order to do this efficiently, it must be possible to make this query in a single HTTP request.

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

## Common destinations relating to in-page content

Sometimes, there may be a standard activity, e.g. "Get help information", that applies to the specific content on a particular page (or part of a page)&mdash;an example may be getting help on logging in (as opposed to getting help in general). In these cases, we cannot use a single well-known URL&mdash;such a URL would only point to the main "help" section's landing page.

In this case, we can instead add a `rel` attribute to the link on a page that takes the user to help information on that page. The fact that there is specific help information available could be detected by the UA (or extension). This information could then be rendered in an appropriate way for the user, e.g:

* Being added to the extension's pop-up, in a page-specific section.

* Having a symbol or some other highlight added to the link itself in the page, to direct the user's attention to it.

This part of the specification adds values to the existing ones specifed/registered in the areas listed in the [link types/relations](#link-typesrelations) subsection below.

> **TODO:** This is not a complete list&mdash;we are consulting with COGA to update the [destinations that Adapt inherited from COGA](https://raw.githack.com/w3c/adapt/CR-content-2022-07-26/content/index.html#values-0).

* `help`

* &hellip;

## Key scenarios

This section explains key use cases, most of which begin with the user interacting with an interface provided by the UA (or UA extension) that supports navigating to well-known destinations.

Whilst users could visit the well-known URLs corresponding to destinations directly (by typing their address in the browser's addresss bar), this is not expected to be a normal use case.

### Enumerating common destinations

This would happen the first time that a UA visits a page on a given origin (or after the cached response expires).

1. UA requests `/.well-known/ia`

2. Depending on whether the URL exists&hellip;

   1. **If the URL exists:** the UA receives a JSON response, listing all the available common destination keys, as described above. The UA (or UA extension) can update its interface to reflect the supported destinations.

   2. **If the URL does not exist:** A 404 response is received. The UA (or UA extension) can update its interface to reflect that no destinations are supported by the origin.

### Directly visiting a common destination

This would normally happen when the user activates a control in the UA's (or UA extension's) interface to trigger visiting the particular destination.

1. UA requests the well-known URL directly.

2. Depending on whether the URL exists&hellip;

   1. **If the URL exists:** a redirect is given, and the actual page loads normally (assuming the "real" URL given in the redirect is valid).

   2. **If the URL does not exist:** A 404 response is received. In this case, the UA would display the 404 page&hellip;this is unlikely to happen in normal use (because supported destinations would've already been queried), and may indicate that the site is mis-configured.

### Discovering well-known destinations linked from the current page

1. UA loads a page.

2. All anchor elements with both `href` and `rel` attributes have their `rel` attributes parsed.

3. If the `rel` attributes contain a well-known destination, then the first matching well-known destination is taken to be the applicable one, and the UA (or extension) can update its interface to alert the user to the fact that this relevant link was discovered. This could be done (for example) in the following ways:

   - This specific in-page link could be added to a menu of supported destinations, separately to site-wide destinations.
   
     When the user activates the control corresponding to the in-page link, the link could be focused, so that the user can find out where the link is going to go, before chosing to follow it.
   
   - Highlighting the link in-page.

### Example: What if my site has multiple help pages

In this case, there are two things that site owners/content authors can do:

* Provde a well-known URI `/.well-known/ia/help` to link to the main help section's landing page.

* Provide `rel="help"` attributes on any link, on any page, that takes the user directly to a page within the help section of the site that covers a specific topic.

This will have the following effects:

* There will be notice given that the site offers help information, in the "global" UI (which we expect, in the short-term, to be a browser extension pop-up).

* Any link, on any page, that goes directly to a help topic can be signposted/emphasised by the UA.

### Updating a well-known URL

When the "real" URL to which a well-known URL points is changed (because the page is moved/deleted), then the well-known URL redirect must be updated, or removed entirely.

**Note:** This is discussed in more detail in the following section.

## Detailed design discussion

### Cacheing

> **TODO:** Fill in the details here. Simplistically, the response to the namespace request can be cached like normal. The UA doesn't need to request it every time. We must seek wide review on sensible values here.

### Avoiding incentivising in-page links only

One of the key problems this specification aims to solve is supporting users in discovering the content, or functionality, provided by the _site as a whole_. This is key, because some people find it very hard to navigate around big sites.

By also allowing in-page links&mdash;which, it's assumed, would be closer to existing content-editing activities, and thus easier to provide/update than site-wide information in the `/.well-known/ia/` space&mdash;we risk incentivising people to only include this information.

This poses the risk that the interface presented by the UA will not give a complete picture of what is available on the site, and thus either not be of great use, or&mdash;worse&mdash;be actively confusing for people to use.

### Naming the namespace

The namespace has been specified as `/.well-known/ia/`, with "ia" standing for "information architecture". This term matches clauses 2, 4, and 8 of [the definition of "information architecture" as given by Wikipedia](https://en.wikipedia.org/wiki/Information_architecture#Definition). Clause 2 states:

> The art and science of organizing and labeling web sites, intranets, online communities, and software to support findability and usability.

Other options instead of "ia" were considered, including "information-architecture", "structure", and others. However "ia" was both felt to be accurate, and is more concise than the other alternatives.

## Open questions

> **TODO:** We are enaging with stakeholders to discuss and form proposals for these questions.

### Providing well-known destinations for sub-sites

Well-known URLs work on the basis of _origins_.

If a site is organised in such a way to have sub-sites that are at subdomains, this will work as intended&mdash;the destinations for each sub-site will be reflected separately.

However, if the overall site is organised such that sub-sites are rooted at different URL paths, this will not be the case.

> **TODO:** We are investigating:
>
> * How much of a barrier this may be.
>
>   - How many sites may be affected.
>
>   - How problematic it may be for users to have to visit a landing page that provides links to sub-site-specific pages.
>
> * Ways that this could be overcome (other than having the well-known destination point to a landing page that provides onward links to sub-site pages).

## Considered alternatives

### Sitemaps

[Sitemaps](https://www.sitemaps.org/) are intended to solve different problems than this work.

* Sitemaps are intended to enumerate all major (and possibly minor) pages; our goal here is to highlight specific common pages that may be provided.

* Sitemaps do not give standard names to certain types of pages; our goal here is to semantically identify the purpose of specific pages, so that the UA can present this information to the user, and so that machines can reach certain pages.

It does not seem like a good fit to try to extend the format of sitemaps to accommodate these requirements.

### Using `rel` values alone

Using `rel` values is part of the proposed spec&mdash;for cases where deep links may be provided into an overall well-known section (e.g. help on a specific topic).

It would be possible to use _only_ `rel` values to highlight well-known destinations, but this would have the disadvantage that the overall destinations for a particular site could not be determined, nor presented to the user, in a simple and robust way. The user could only discover them if they landed on the right pages.

> **TODO:* Open questions:
>
> * How often would footer links cover this? (If often, does that negate the need for this spec?)
>
> * What is the performance cost of parsing all those `rel` attributes every time? (This would be required if the `rel` approach were to be used at all.)

## Stakeholder Feedback / Opposition

> **TODO:** We are actively involved in early discussions with some stakeholders, and will seek wide review as soon as possible.

## References & acknowledgements

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

#### Link types/relations

* HTML's [standard link types](https://html.spec.whatwg.org/multipage/links.html#linkTypes)

* Extended link types (also known as "link relations"):

  - [Link types managed by the Microformats project](https://html.spec.whatwg.org/multipage/links.html#other-link-types)

  - [Link types anaged by IANA](https://www.iana.org/assignments/link-relations/link-relations.xhtml)
