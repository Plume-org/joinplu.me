#! /bin/bash

rxgettext source/index.html.erb source/_nav.erb source/layouts/* -o po/joinplume.pot
for lang in `cat po/LINGUAS`; do
  if [ -f "po/$lang.po" ]; then
    msgmerge -U "po/$lang.po" "po/joinplume.pot"
  else
    msginit --input "po/joinplume.pot" --output-file "po/$lang.po" -l $lang --no-translator
  fi
  mkdir -p "translations/$lang/LC_MESSAGES"
  msgfmt --output-file "translations/$lang/LC_MESSAGES/joinplume.mo" "po/$lang.po"
done;
