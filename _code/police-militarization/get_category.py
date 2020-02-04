def get_category(name):
    # Clean up str
    name = name.replace("DESC=", "").lower()
    category = ""
    if "grenade" in name:
        category = "grenade-launchers"
    elif "night vision" in name:
        category = "night-vision"
    elif name == "rifle,5.56 millimeter" or name == "rifle,7.62 millimeter":
        category = "assault-rifles"
    elif name in ["truck,tank", "light armored vehicle", "grader,road,motorized,armored", "armored vehicle", "truck,armored","car,armored", "tractor  semi  armored","semitrailer,tank", "mine resistant vehicle", "zbv military trailer", "frame,armor,vehicular window","plate,armor,radiator", "armor,transparent,vehicular window"]:
        category = "armored-vehicles" # Tanks, Trucks, and Cars and armored plating
    elif name in ["aircraft, fixed wing", "aircraft, rotary wing", "helicopter,search and rescue", "helicopter,observation", "helicopter,utility", "helicopter,flight trainer th55a", "helicopter,medevac","airplane,flight t42a","airplane,cargo-transport","airplane,utility u8f"]:
        category = "aircraft"
    elif (("armor," in name and name != "kit assembly,4-door,mak armor,hmmwv,m1165") or "helmet," in name) or name in ["riot control shield", "helmet,riot", "faceshield,riot control", "riot gear", "riot shield", "faceshield,military,riot control", "helmet,battle,mk7"]:
        category = "body-armor"
    else:
        category = "other"

    return category
