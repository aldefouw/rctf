# Variables
COVERAGE_DIR="$(pwd)"
COMMIT_HASH=$(git rev-parse --short HEAD)
LATEST_DIR="${COVERAGE_DIR}/docs/latest"
TARGET_DIR="${COVERAGE_DIR}/docs/${COMMIT_HASH}"
INDEX_FILE="${COVERAGE_DIR}/docs/index.html"
CURRENT_DATE=$(date +"%Y-%m-%d %H:%M:%S")

# Step 1: Create a new folder for the commit hash and copy the coverage files
mkdir $TARGET_DIR
cp -R "$LATEST_DIR"/* $TARGET_DIR

# Step 2: Check if the index.html file exists, create if it doesn't
if [ ! -f "$INDEX_FILE" ]; then
    echo "<html><head><title>Test Coverage Reports</title></head><body>" > "$INDEX_FILE"
    echo "<h1>Test Coverage Reports</h1><ul>" >> "$INDEX_FILE"
    echo "<li>${CURRENT_DATE} - <a href='./latest/docs/index.html'>Latest</a></li>" >> "$INDEX_FILE"
else
    # If the index.html exists, just add the new entry to the existing list
    # Remove the closing tags temporarily
    sed -i '$ d' "$INDEX_FILE"  # Removes the last line </ul></body></html>
fi

# Add the new entry for the current commit hash
echo "<li>${CURRENT_DATE} - <a href='./${COMMIT_HASH}/docs/index.html'>${COMMIT_HASH}</a></li>" >> "$INDEX_FILE"

# End the HTML file
echo "</ul></body></html>" >> "$INDEX_FILE"