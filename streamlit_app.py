import streamlit as st
from streamlit_gsheets import GSheetsConnection
import pandas as pd

# Page setup
st.set_page_config(page_title="Garden Horizons Live Stock", page_icon="🌱")

st.title("🌱 Garden Horizons Live Stock")
st.write("Real-time updates for seeds and gear.")

try:
    # Establishing connection to Google Sheets
    # This reads from your [connections.gsheets] in the Streamlit Secrets
    conn = st.connection("gsheets", type=GSheetsConnection)
    
    # Read the data - ttl="1m" means it refreshes every minute
    df = conn.read(ttl="1m")
    
    # Display the full stock list
    if not df.empty:
        st.subheader("Current Market Inventory")
        # This will display your sheet as a clean, searchable table
        st.dataframe(df, use_container_width=True, hide_index=True)
        
        # Simple buttons to filter if the sheet gets large
        if "Category" in df.columns:
            tab1, tab2 = st.tabs(["Seeds", "Gear"])
            with tab1:
                st.table(df[df['Category'].str.contains('Seed', case=False, na=False)])
            with tab2:
                st.table(df[df['Category'].str.contains('Gear', case=False, na=False)])
    else:
        st.warning("The spreadsheet is empty. Add some items to your Google Sheet to see them here!")

except Exception as e:
    st.error("Connection Error: Streamlit cannot reach your Google Sheet.")
    st.info("Check your Streamlit Secrets and ensure the Sheet URL is correct.")
    # This helps you debug without leaking your full secret keys
    if "404" in str(e):
        st.write("Error: Spreadsheet not found. Check the ID in your URL.")
    elif "403" in str(e):
        st.write("Error: Access Denied. Make sure your sheet is set to 'Anyone with the link' can view.")
