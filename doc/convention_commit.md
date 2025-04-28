# Git Commit guidelines

```bash
<type>(<portée>): <sujet>

<description>

<footer>
```
## `<type>`

- `build` : changements qui affectent le système de build ou des dépendances externes (npm, make…) (🏗️) (📦️)
- `ci` : changements concernant les fichiers et scripts d’intégration ou de configuration (Travis, Ansible, BrowserStack…) (🔧)
- `feat` : ajout d’une nouvelle fonctionnalité (✨)
- `fix` : correction d’un bug (🐛)
- `perf` : amélioration des performances (⚡️)
- `refactor` : modification qui n’apporte ni nouvelle fonctionalité ni d’amélioration de performances (♻️)
- `style` : changement qui n’apporte aucune alteration fonctionnelle ou sémantique (indentation, mise en forme, ajout d’espace, renommante d’une variable…) (💄)
- `docs` : rédaction ou mise à jour de documentation (📝) (✏️)
- `test` : ajout ou modification de tests (✅)

À cela s’ajoute `revert` (⏪️) . Ce dernier permet comme son nom l’indique, d’annuler un précédent commit. Dans ce cas, le message prend la forme suivante :

```sql
revert sujet du commit annulé hash du commit annulé
```

## `<portée>`

La partie affectée (scope)

C’est la deuxième élément de la première ligne. Il nous permet immédiatement de savoir quelle partie du projet est affectée. Par exemple pour un site de e-commerce, on pourrait avoir *product*, *cart* ou *checkout*.

Cet élément est facultatif. En effet, il n’est parfois pas pertinent. On peut utiliser (common)

## `<sujet>`

Le sujet contient une description **succinte** des changements. En général, on se limite à 50 caractères. De nombreux outils avertissent d’ailleurs lorsque l’on dépasse la longueur maximale.

Pour adopter un style descriptif efficace, on utilise l’impératif présent : *add, change, update, remove* et non pas *changed* ou *removed*. `add caching for better performance` par exemple.

Personnellement, je suis le style guide et je ne mets pas de majuscule à la première lettre du sujet ni ne met de point à la fin. L’essentiel est surtout d’adopter une politique et de s’y tenir afin d’être cohérent.

## `<description>`

Expliquer le changement (pas le contenu), les motivations qui ont poussé à la modification

Beaucoup l’ignorent, mais les messages peuvent comporter un corps dans lequel on peut expliquer plus en détails la raison des changements. De même que pour le sujet, on utilisera l’impératif présent.

De nouveau, on explique ici la raison du changement et en quoi c’est nouvelle manière est différente de l’état précédent.

Le comment est visible directement dans le code. Par ailleurs, si le code est complexe, c’est le moment de penser à le commenter si ce n’est pas déjà fait !

## `<footer>`

De même que le corps du message, le footer est facultatif. On l’utilisera d’ailleurs moins souvent.

On réserve le footer aux *breaking changes* et on y référence aussi le ticket d’erreur que règlent les modifications le cas échéant.

ex : Closes #123, #234 (quand on révolse une issue)

## Emojis

[gitmoji](https://gitmoji.dev/)

[Complete list of github markdown emoji markup](https://gist.github.com/rxaviers/7360908)

## Exemples

```bash
add gitignore
add licence
update docs
change icon for revert for a more expressive one
add exec rights to hooks
```
