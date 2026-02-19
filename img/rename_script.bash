for file in ui_image_RoundPortrait_*_01.png; do
    # extract the middle part (remove prefix and _01 suffix)
    newname=$(echo "$file" | sed 's/ui_image_RoundPortrait_//; s/_01\.png/.png/')
    mv "$file" "$newname"
    echo "Renamed: $file -> $newname"
done
