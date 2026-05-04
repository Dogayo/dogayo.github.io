import 'dart:convert';

class PortfolioInfo {
  PortfolioInfo({
    required this.fullName,
    required this.roleTitle,
    required this.metaLine,
    required this.speciality,
    required this.contacts,
    required this.summaryStats,
    required this.experience,
    required this.education,
    required this.coursesAndCertifications,
    required this.skills,
  });

  factory PortfolioInfo.fromJson(Map<String, dynamic> json) {
    return PortfolioInfo(
      fullName: json['fullName'] as String,
      roleTitle: json['roleTitle'] as String,
      metaLine: json['metaLine'] as String,
      speciality: Speciality.fromJson(
        json['speciality'] as Map<String, dynamic>,
      ),
      contacts: PortfolioContacts.fromJson(
        json['contacts'] as Map<String, dynamic>,
      ),
      summaryStats: json['summaryStats'] as String,
      experience: ExperienceSection.fromJson(
        json['experience'] as Map<String, dynamic>,
      ),
      education: EducationSection.fromJson(
        json['education'] as Map<String, dynamic>,
      ),
      coursesAndCertifications: CoursesAndCertifications.fromJson(
        json['coursesAndCertifications'] as Map<String, dynamic>,
      ),
      skills: SkillsSection.fromJson(json['skills'] as Map<String, dynamic>),
    );
  }

  static PortfolioInfo fromJsonString(String source) {
    return PortfolioInfo.fromJson(jsonDecode(source) as Map<String, dynamic>);
  }

  final String fullName;
  final String roleTitle;
  final String metaLine;
  final Speciality speciality;
  final PortfolioContacts contacts;
  final String summaryStats;
  final ExperienceSection experience;
  final EducationSection education;
  final CoursesAndCertifications coursesAndCertifications;
  final SkillsSection skills;

  List<String> get statParts => summaryStats
      .split('|')
      .map((s) => s.trim())
      .where((s) => s.isNotEmpty)
      .toList();
}

class Speciality {
  Speciality({required this.heading, required this.description});

  factory Speciality.fromJson(Map<String, dynamic> json) {
    return Speciality(
      heading: json['heading'] as String,
      description: json['description'] as String,
    );
  }

  final String heading;
  final String description;
}

class PortfolioContacts {
  PortfolioContacts({
    required this.email,
    required this.github,
    required this.telegram,
    this.linkedin,
  });

  factory PortfolioContacts.fromJson(Map<String, dynamic> json) {
    final linkedInRaw = json['linkedin'] as Map<String, dynamic>;
    final linkedValue = linkedInRaw['value'] as String;
    final linkedUrl = linkedValue.startsWith('http') ? linkedValue : null;

    return PortfolioContacts(
      email: json['email'] as String,
      github: SocialLink.fromUrlMap(json['github'] as Map<String, dynamic>),
      telegram: SocialLink.fromUrlMap(json['telegram'] as Map<String, dynamic>),
      linkedin: linkedUrl != null
          ? SocialLink(label: linkedInRaw['label'] as String, url: linkedUrl)
          : null,
    );
  }

  final String email;
  final SocialLink github;
  final SocialLink telegram;
  final SocialLink? linkedin;
}

class SocialLink {
  SocialLink({required this.label, required this.url});

  factory SocialLink.fromUrlMap(Map<String, dynamic> json) {
    return SocialLink(
      label: json['label'] as String,
      url: json['url'] as String,
    );
  }

  final String label;
  final String url;
}

class ExperienceSection {
  ExperienceSection({
    required this.sectionHeading,
    required this.lastPosition,
    required this.earlyCareer,
  });

  factory ExperienceSection.fromJson(Map<String, dynamic> json) {
    return ExperienceSection(
      sectionHeading: json['sectionHeading'] as String,
      lastPosition: JobBlock.fromJson(
        json['lastPosition'] as Map<String, dynamic>,
      ),
      earlyCareer: JobBlock.fromJson(
        json['earlyCareer'] as Map<String, dynamic>,
      ),
    );
  }

  final String sectionHeading;
  final JobBlock lastPosition;
  final JobBlock earlyCareer;
}

class JobBlock {
  JobBlock({
    required this.subsectionHeading,
    required this.title,
    required this.organization,
    required this.period,
    required this.duration,
    required this.responsibilities,
  });

  factory JobBlock.fromJson(Map<String, dynamic> json) {
    return JobBlock(
      subsectionHeading: json['subsectionHeading'] as String,
      title: json['title'] as String,
      organization: json['organization'] as String,
      period: json['period'] as String,
      duration: json['duration'] as String,
      responsibilities: (json['responsibilities'] as List<dynamic>)
          .cast<String>(),
    );
  }

  final String subsectionHeading;
  final String title;
  final String organization;
  final String period;
  final String duration;
  final List<String> responsibilities;
}

class EducationSection {
  EducationSection({
    required this.sectionHeading,
    required this.formal,
    required this.additional,
  });

  factory EducationSection.fromJson(Map<String, dynamic> json) {
    return EducationSection(
      sectionHeading: json['sectionHeading'] as String,
      formal: FormalEducation.fromJson(json['formal'] as Map<String, dynamic>),
      additional: AdditionalEducation.fromJson(
        json['additional'] as Map<String, dynamic>,
      ),
    );
  }

  final String sectionHeading;
  final FormalEducation formal;
  final AdditionalEducation additional;
}

class FormalEducation {
  FormalEducation({
    required this.institution,
    required this.program,
    required this.period,
    required this.duration,
    required this.keyDisciplinesHeading,
    required this.keyDisciplines,
    required this.achievementsHeading,
    required this.achievements,
  });

  factory FormalEducation.fromJson(Map<String, dynamic> json) {
    return FormalEducation(
      institution: json['institution'] as String,
      program: json['program'] as String,
      period: json['period'] as String,
      duration: json['duration'] as String,
      keyDisciplinesHeading: json['keyDisciplinesHeading'] as String,
      keyDisciplines: (json['keyDisciplines'] as List<dynamic>).cast<String>(),
      achievementsHeading: json['achievementsHeading'] as String,
      achievements: (json['achievements'] as List<dynamic>).cast<String>(),
    );
  }

  final String institution;
  final String program;
  final String period;
  final String duration;
  final String keyDisciplinesHeading;
  final List<String> keyDisciplines;
  final String achievementsHeading;
  final List<String> achievements;
}

class AdditionalEducation {
  AdditionalEducation({
    required this.subsectionHeading,
    required this.title,
    required this.period,
    required this.description,
  });

  factory AdditionalEducation.fromJson(Map<String, dynamic> json) {
    return AdditionalEducation(
      subsectionHeading: json['subsectionHeading'] as String,
      title: json['title'] as String,
      period: json['period'] as String,
      description: json['description'] as String,
    );
  }

  final String subsectionHeading;
  final String title;
  final String period;
  final String description;
}

class CoursesAndCertifications {
  CoursesAndCertifications({required this.sectionHeading, required this.items});

  factory CoursesAndCertifications.fromJson(Map<String, dynamic> json) {
    return CoursesAndCertifications(
      sectionHeading: json['sectionHeading'] as String,
      items: (json['items'] as List<dynamic>).cast<String>(),
    );
  }

  final String sectionHeading;
  final List<String> items;
}

class SkillsSection {
  SkillsSection({
    required this.sectionHeading,
    required this.programmingLanguages,
    required this.mobileFrameworks,
    required this.toolsAndDevOps,
    required this.specialization,
  });

  factory SkillsSection.fromJson(Map<String, dynamic> json) {
    return SkillsSection(
      sectionHeading: json['sectionHeading'] as String,
      programmingLanguages: SkillSubsection.fromJson(
        json['programmingLanguages'] as Map<String, dynamic>,
      ),
      mobileFrameworks: SkillSubsection.fromJson(
        json['mobileFrameworks'] as Map<String, dynamic>,
      ),
      toolsAndDevOps: SkillSubsection.fromJson(
        json['toolsAndDevOps'] as Map<String, dynamic>,
      ),
      specialization: SkillSubsection.fromJson(
        json['specialization'] as Map<String, dynamic>,
      ),
    );
  }

  final String sectionHeading;
  final SkillSubsection programmingLanguages;
  final SkillSubsection mobileFrameworks;
  final SkillSubsection toolsAndDevOps;
  final SkillSubsection specialization;
}

class SkillSubsection {
  SkillSubsection({required this.subsectionHeading, required this.summary});

  factory SkillSubsection.fromJson(Map<String, dynamic> json) {
    return SkillSubsection(
      subsectionHeading: json['subsectionHeading'] as String,
      summary: json['summary'] as String,
    );
  }

  final String subsectionHeading;
  final String summary;

  List<String> get summaryParts => summary
      .split(',')
      .map((s) => s.trim())
      .where((s) => s.isNotEmpty)
      .toList();
}
