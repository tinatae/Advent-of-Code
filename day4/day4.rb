input = File.readlines('4.txt').join.split(/\n\n/)

# HAVE PASSPORT INFO. MUST HAVE "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" BUT "cid" IS OPTIONAL
# PART ONE: FIGURE OUT WHICH OF THESE ARE VALID
# PART TWO: FIGURE OUT WHICH OF THESE ARE STILL VALID GIVEN THE VALIDATIONS

def clarify(input)
    cleaned_up = input.map do |ele|  
        if ele.include?("\n")
            ele.split(/\n+/).join(" ")          # REMOVE INNER-PASSPORT LINE BREAKS
        else
            ele
        end
    end

    # passport = {"byr" => 0, "iyr" => 0, "eyr" => 0, "hgt" => "", "hcl" => "", "ecl" => "", "pid" => 0, "cid" => 0}
    passports = []
    passport = {}

    cleaned_up.each do |object_string|
        object_string.split(" ").each do |attribute|
            if !passport.keys.include?(attribute[0..2])             # IN FORMAT "byr:2019"
                passport[attribute[0..2]] = attribute[4..-1]
            else
                passport[attribute[0..2]] = attribute[4..-1]
            end
        end
        passports.push(passport)
        passport = {}
    end

    valid = []
    invalid = []

    passports.each do |passport| 
        if passport.keys.to_set == Set.new(["byr", "iyr", "eyr", "hgt", "ecl", "pid", "hcl"]) || passport.keys.to_set == Set.new(["byr", "iyr", "eyr", "hgt", "ecl", "pid", "cid", "hcl"])
            valid.push(passport) 
        else
            invalid.push(passport)
        end
    end

    # p valid.length         # RETURNS 233 FOR PART ONE
    part_two(valid)          # FEED INTO PART TWO

end

def part_two(data)
    not_valid = []

    data.each do |object|
        object.keys.each do |key|
            not_valid.push(object) if key == "byr" && validate_byr(object["byr"]) == false
            not_valid.push(object) if key == "iyr" && validate_iyr(object["iyr"]) == false
            not_valid.push(object) if key == "eyr" && validate_eyr(object["eyr"]) == false
            not_valid.push(object) if key == "hgt" && validate_hgt(object["hgt"]) == false 
            not_valid.push(object) if key == "hcl" && validate_hcl(object["hcl"]) == false 
            not_valid.push(object) if key == "ecl" && validate_ecl(object["ecl"]) == false
            not_valid.push(object) if key == "pid" && validate_pid(object["pid"]) == false 
        end        
    end

    remove = not_valid.to_set.size
    data.length - remove                    # RETURNS 111
end

# VALIDATIONS

def validate_byr(val) 
    val.to_i >= 1920 && val.to_i <= 2002
end

def validate_iyr(val)
    val.to_i >= 2010 && val.to_i <= 2020
end

def validate_eyr(val)
    val.to_i >= 2020 && val.to_i <= 2030
end

def validate_hgt(val)
    if val[-2..-1] == "cm"
        return true if val[0...-2].to_i >= 150 && val[0...-2].to_i <= 193
    elsif val[-2..-1] == "in"
        return true if val[0...-2].to_i >= 59 && val[0...-2].to_i <= 76
    end
    false
end

def validate_hcl(val)
    return true if /^#[0-9a-f]{6}$/.match(val)
    false
end

def validate_ecl(val)
    Set.new(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]).include?(val)
end

def validate_pid(val)
    return true if /^[\d]{9}$/.match(val.to_s)
    false
end

# p validate_hgt("32in")
# p validate_hcl("#abd3e5")
# p validate_ecl("wrn")
# p validate_pid("01928392")
p clarify(input)
