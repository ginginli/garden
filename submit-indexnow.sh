#!/bin/bash

# IndexNow Submission Script for Garden Horizons
# Submit updated URLs to search engines

KEY="0f1a785e2be64e3aa6bc3b0db93f28e7"
HOST="gardenhorizons.org"
ENDPOINT="https://api.indexnow.org/IndexNow"

# All site URLs (from sitemap.xml)
URLS=(
    "https://gardenhorizons.org/"
    "https://gardenhorizons.org/calculator/"
    "https://gardenhorizons.org/adminabuse/"
    "https://gardenhorizons.org/updates/"
    "https://gardenhorizons.org/codes/"
    "https://gardenhorizons.org/mutations/"
    "https://gardenhorizons.org/stock/"
    "https://gardenhorizons.org/secrets/"
    "https://gardenhorizons.org/feedback/"
    "https://gardenhorizons.org/ph/"
    "https://gardenhorizons.org/ph/calculator/"
    "https://gardenhorizons.org/ph/adminabuse/"
    "https://gardenhorizons.org/ph/updates/"
    "https://gardenhorizons.org/ph/codes/"
    "https://gardenhorizons.org/ph/mutations/"
    "https://gardenhorizons.org/ph/stock/"
    "https://gardenhorizons.org/ph/secrets/"
    "https://gardenhorizons.org/ph/feedback/"
    "https://gardenhorizons.org/vn/"
    "https://gardenhorizons.org/vn/calculator/"
    "https://gardenhorizons.org/vn/adminabuse/"
    "https://gardenhorizons.org/vn/updates/"
    "https://gardenhorizons.org/vn/codes/"
    "https://gardenhorizons.org/vn/mutations/"
    "https://gardenhorizons.org/vn/stock/"
    "https://gardenhorizons.org/vn/secrets/"
    "https://gardenhorizons.org/vn/feedback/"
)

# Build JSON payload
JSON=$(cat <<EOF
{
    "host": "$HOST",
    "key": "$KEY",
    "urlList": [
        $(printf '"%s",' "${URLS[@]}" | sed 's/,$//')
    ]
}
EOF
)

echo "Submitting to IndexNow..."
echo "$JSON" | curl -s -H "Content-Type: application/json" -d @- "$ENDPOINT"
echo ""

# Also submit to Bing (alternative endpoint)
echo "Submitting to Bing..."
BING_ENDPOINT="https://www.bing.com/indexnow"
echo "$JSON" | curl -s -H "Content-Type: application/json" -d @- "$BING_ENDPOINT"
echo ""
