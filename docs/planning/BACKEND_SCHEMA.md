# Data and access

Project: Dexter Soriano portfolio  
Owner: Dexter Soriano  
Review: Draft · last reviewed 2026-10-18  
Scope: Pixel-art town portfolio redesign

## Applicability and inventory

Application type: static personal portfolio. No backend, database, user accounts, contact form, or analytics are in scope.

| Data | Purpose | Location/provider | Lifecycle |
|---|---|---|---|
| Public portfolio content and assets | Describe Dexter, work, experience, and contact routes | Static site files served by hosting provider | Public while deployed; maintain or remove through repository/deployment updates. |
| Theme preference | Restore visitor’s day/night choice | Browser local storage on the visitor’s device | Remains until visitor clears browser storage; no server copy. |
| Email/social/project links | Let visitor contact Dexter or visit other services | Browser navigates to linked external destination | Those services apply their own handling and retention. |

No visitor-submitted content is collected by the portfolio. Hosting infrastructure may process ordinary request logs under the provider’s terms; verify provider behavior during deployment. Do not add analytics or form handling without an explicit scope decision and updated lifecycle review.

## Permissions and lifecycle

All deployed portfolio content is public. There are no authenticated operations or application authorization rules. Keep private ClaimCheck capabilities and data out of public copy and demos unless their publication is verified and approved.

Dexter controls published content through the repository and hosting account. Visitors control local theme storage through their browser. External email, social, and project destinations are separate services. This plan does not establish any retention behavior for those services.
