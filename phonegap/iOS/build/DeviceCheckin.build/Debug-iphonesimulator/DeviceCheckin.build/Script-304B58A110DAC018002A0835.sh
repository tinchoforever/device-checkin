#!/bin/sh
SRC_DIR="www"
DST_DIR="$BUILT_PRODUCTS_DIR/$FULL_PRODUCT_NAME/www"
COPY_HIDDEN=

if [[ ! -e "$SRC_DIR" ]]; then
  echo "Path does not exist: $SRC_DIR"
  exit 1
fi

if [[ -n $COPY_HIDDEN ]]; then
  alias do_find='find "$SRC_DIR"'
else
  alias do_find='find "$SRC_DIR" -name ".*" -prune -o'
fi

time (
# Code signing files must be removed or else there are
# resource signing errors.
rm -rf "$DST_DIR" \
       "$BUILT_PRODUCTS_DIR/$FULL_PRODUCT_NAME/_CodeSignature" \
       "$BUILT_PRODUCTS_DIR/$FULL_PRODUCT_NAME/PkgInfo" \
       "$BUILT_PRODUCTS_DIR/$FULL_PRODUCT_NAME/embedded.mobileprovision"

# Directories
for p in $(do_find -type d -print); do
  subpath="${p#$SRC_DIR}"
  mkdir "$DST_DIR$subpath" || exit 1
done

# Symlinks
for p in $(do_find -type l -print); do
  subpath="${p#$SRC_DIR}"
  cp -a "$SRC_DIR$subpath" "$DST_DIR$subpath" || exit 2
done

# Files
for p in $(do_find -type f -print); do
  subpath="${p#$SRC_DIR}"
  if ! ln "$SRC_DIR$subpath" "$DST_DIR$subpath"; then
    cp -a "$SRC_DIR$subpath" "$DST_DIR$subpath" || exit 3
  fi
done

)
