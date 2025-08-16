#!/bin/zsh
# Deploy frontend naar Vercel en zet de juiste API URL

cd "$(dirname "$0")"

BACKEND_URL="https://mobiletrackerapp-backend.vercel.app/api"

vercel env add NEXT_PUBLIC_API_URL production "$BACKEND_URL"
vercel --prod --yes
