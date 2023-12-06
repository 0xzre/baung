#!/bin/bash

prompt_exit() {
  read -p "Press Enter to continue, or 'q' to quit..."
  if [[ "$REPLY" == "q" || "$REPLY" == "q" ]]; then
    echo "Quitting..."
    exit
  fi
}

while true; do
  echo "What would you like to do? (Enter the number)"

  echo "1. Create an admin"
  echo "2. Add communities and rules to the database"
  echo "3. Add rules to communities"
  echo "4. Add moderators to communities (also available from the admin panel)"
  echo "5. Remove moderators from communities (also available from the admin panel)"

  echo "Press 'q' and Enter to exit or any other key to continue..."

  read choice

  case $choice in
    1)
      bun "scripts/create-admin.js"
      prompt_exit
      ;;
    2)
      bun "scripts/add-community.js"
      prompt_exit
      ;;
    3)
      bun "scripts/add-rules.js"
      prompt_exit
      ;;
    4)
      bun "scripts/add-moderator.js"
      prompt_exit
      ;;
    5)
      bun "scripts/remove-moderator.js"
      prompt_exit
      ;;
    q|Q)
      echo "Exiting..."
      exit
      ;;
    *)
      echo "Invalid input, please try again."
      ;;
  esac

done
