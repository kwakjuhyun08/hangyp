export type Lang = 'ko' | 'en' | 'ar';

export interface CalEvent {
  month: number;
  day: number;
  span: number;
  label: string;
}

export interface AboutMeaning {
  k: string;
  v: string;
}

export interface TimelineItem {
  label: string;
  desc: string;
}

export interface CultureItem {
  title: string;
  desc: string;
}

export interface Phase {
  title: string;
  date: string;
  desc: string;
}

export interface Copy {
  welcome: string;
  gateSub: string;
  placeholder: string;
  enterBtn: string;
  error: string;
  hint: string;
  privacyNote: string;
  kicker: string;
  heroSub: string;
  heroPlaceholder: string;
  philosophy: string;
  philosophySub: string;
  comingNextLabel: string;
  soon: string;
  footerTag: string;
  nav: string[];
  calTitle: string;
  calSub: string;
  calWeek: string[];
  calMonthNames: string[];
  calYearPrefix?: string;
  calYearSuffix?: string;
  calEvents: CalEvent[];
  teamTitle: string;
  teamSub: string;
  teamEmpty: string;
  tbd: string;
  backBtn: string;
  fAge: string;
  fMbti: string;
  fInterests: string;
  fSkill: string;
  fFood: string;
  fColor: string;
  fMusic: string;
  fDream: string;
  fMotto: string;
  fPosition: string;
  fInstagram: string;
  fPhone: string;
  aboutTitle: string;
  aboutSub: string;
  aboutMeaningTitle: string;
  aboutMeaning: AboutMeaning[];
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  valuesTitle: string;
  values: string[];
  whyTitle: string;
  whyText: string;
  timelineTitle: string;
  timeline: TimelineItem[];
  journeyTitle: string;
  journeySub: string;
  journeyNote: string;
  cultureTitle: string;
  cultureSub: string;
  cultureBackBtn: string;
  culture: CultureItem[];
  galleryTitle: string;
  gallerySub: string;
  galleryNote: string;
  galleryLikes: string;
  galleryComment: string;
  galleryShare: string;
  galleryCaptionPlaceholder: string;
  uploadTitle: string;
  uploadSub: string;
  uploadCodePlaceholder: string;
  uploadLoginBtn: string;
  uploadError: string;
  uploadedAs: string;
  uploadBtn: string;
  uploadLogoutBtn: string;
  uploadDemoNote: string;
  uploadRestrictedNote: string;
  postedBy: string;
  uploadPageBtn: string;
  uploadBackBtn: string;
  postBtn: string;
  contactTitle: string;
  contactSub: string;
  contactEmailLabel: string;
  contactEmailVal: string;
  contactInstaLabel: string;
  contactInstaVal: string;
  contactPhoneLabel: string;
  contactPhoneVal: string;
  contactKakaoLabel: string;
  contactKakaoVal: string;
  galleryEmpty: string;
  commentPlaceholder: string;
  deleteBtn: string;
  phases: Phase[];
}

export const COPY: Record<Lang, Copy> = {
  ko: {
    welcome: 'HanGyp에 오신 것을 환영합니다',
    gateSub: '명함 속 팀원의 이름을 적어주세요',
    placeholder: '이름',
    enterBtn: '입장하기',
    error: '코드가 일치하지 않습니다',
    hint: '데모 코드: ONEROOF2026',
    privacyNote: '비공개 사이트 · 검색엔진 비노출',
    kicker: 'Cultural Diplomacy · 2026',
    heroSub: '2026 한–이집트 청소년 교류 프로그램',
    heroPlaceholder: 'placeholder — 시네마틱 영상: 전통 건축 · 단청 · 소나무 · 까치 · 서울 스카이라인',
    philosophy: '다른 문화, 한 지붕, 하나의 미래',
    philosophySub: '서로 다른 곳에서 온 청년들이 하나의 지붕 아래 모여 함께 미래를 그립니다.',
    comingNextLabel: '다가오는 페이지',
    soon: '준비중',
    footerTag: '2026 Korea–Egypt Youth Exchange Program · HanGyp',
    nav: ['홈', '소개', '팀', '타임라인', '캘린더', '문화', '갤러리', '연락처'],
    calTitle: '캘린더',
    calSub: '2026년 한-이집트 청소년 교류 일정',
    calWeek: ['일', '월', '화', '수', '목', '금', '토'],
    calMonthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    calYearPrefix: '2026년 ',
    calEvents: [
      { month: 6, day: 27, span: 1, label: '대표단 선발 면접' },
      { month: 6, day: 29, span: 1, label: '대표단 선발 최종 합격' },
      { month: 7, day: 10, span: 2, label: '발대식 및 사전 교육 1차' },
      { month: 8, day: 9, span: 1, label: '2차 사전 교육 (온라인)' },
      { month: 8, day: 27, span: 2, label: '국내 교류 활동' },
      { month: 10, day: 20, span: 1, label: '파견 결단식 및 3차 사전교육' },
      { month: 10, day: 21, span: 10, label: '파견 활동' },
    ],
    teamTitle: '팀 소개',
    teamSub: '카드를 선택하면 상세 프로필로 이동합니다',
    teamEmpty: '프로필 준비중',
    tbd: '준비중',
    backBtn: '← 팀으로 돌아가기',
    fAge: '나이',
    fMbti: 'MBTI',
    fInterests: '관심사',
    fSkill: '특기',
    fFood: '좋아하는 음식',
    fColor: '좋아하는 색깔',
    fMusic: '좋아하는 음악/아티스트/장르',
    fDream: '미래 꿈·목표',
    fMotto: '좌우명',
    fPosition: '담당',
    fInstagram: '인스타그램',
    fPhone: '전화번호',
    aboutTitle: '소개',
    aboutSub: '다른 문화, 한 지붕, 하나의 미래',
    aboutMeaningTitle: '이름에 담긴 의미',
    aboutMeaning: [
      { k: 'Han', v: '한국' },
      { k: 'Gyp', v: '이집트' },
      { k: '한집(One house)', v: '하나의 집, 하나의 팀' },
    ],
    missionTitle: '미션',
    missionText: '서로 다른 문화권의 청년들이 직접 만나 이해하고 협력하며, 한국과 이집트를 잇는 다음 세대의 우정을 만듭니다.',
    visionTitle: '비전',
    visionText: '문화의 차이를 넘어 하나의 지붕 아래 모인 청년들이 함께 미래를 그리는 교류의 모델이 되는 것입니다.',
    valuesTitle: '핵심 가치',
    values: ['존중', '개방성', '협력', '책임감'],
    whyTitle: '왜 HanGyp인가?',
    whyText:
      'HanGyp는 2026 한–이집트 청소년 교류 프로그램에 참가하는 대한민국 청소년 대표단입니다. 서로 다른 곳에서 온 우리가 하나의 지붕 아래 모여, 문화를 나누고 미래를 함께 그린다는 뜻을 담았습니다.',
    timelineTitle: '타임라인',
    timeline: [
      { label: '참가자 모집 및 지원', desc: '전국의 청소년을 대상으로 참가자를 모집하고 지원서를 받았습니다.' },
      { label: '서류·면접 선발', desc: '지원 서류와 면접을 통해 최종 참가자를 선발했습니다.' },
      { label: '팀 발대식', desc: '선발된 팀원들이 한자리에 모여 정식으로 팀을 출범했습니다.' },
      { label: '사전 모임(온라인)', desc: '온라인으로 모여 서로를 알아가고 프로그램을 준비했습니다.' },
      { label: '사전 모임(오프라인)', desc: '직접 만나 실습과 토론을 통해 교류를 준비했습니다.' },
    ],
    journeyTitle: '타임라인',
    journeySub: '발대식부터 만나는 그날까지',
    journeyNote: '실제 사진·영상·소감은 활동이 진행되며 업데이트됩니다.',
    cultureTitle: '문화',
    cultureSub: '이집트 청소년들에게 소개하고 싶은 한국의 20가지 모습',
    cultureBackBtn: '← 문화로 돌아가기',
    culture: [
      { title: '한글', desc: '세종대왕이 창제한 한국 고유의 표음 문자로, 배우기 쉽고 과학적인 구조를 가지고 있습니다.' },
      { title: '한복', desc: '한국의 전통 의상으로, 곡선의 아름다움과 색의 조화를 중요하게 여깁니다.' },
      { title: '음식 문화', desc: '밥과 반찬을 나누어 먹는 상차림과 발효 음식이 발달한 한국의 식문화입니다.' },
      { title: '전통 건축', desc: '자연과 조화를 이루는 한옥과 온돌 난방 등 한국 고유의 건축 방식입니다.' },
      { title: '단청', desc: '전통 건축물에 칠하는 다섯 가지 색의 문양으로, 건물을 보호하고 격을 나타냅니다.' },
      { title: '차 문화', desc: '마음을 다스리고 손님을 대접하는 한국의 전통 다도 문화입니다.' },
      { title: '학교 생활', desc: '동아리, 급식, 수학여행 등 한국 청소년들의 일상적인 학교 문화입니다.' },
      { title: '교육 문화', desc: '높은 교육열과 대학 입시가 사회 전반에 큰 영향을 미치는 한국의 교육 환경입니다.' },
      { title: '기술과 반도체', desc: '세계적인 수준의 반도체·IT 산업으로 한국 경제를 이끄는 기술 경쟁력입니다.' },
      { title: 'K-pop과 대중문화', desc: '음악, 드라마, 영화 등 전 세계 청년들과 소통하는 한국의 대중문화입니다.' },
      { title: '청년 리더십과 혁신', desc: '새로운 도전을 두려워하지 않는 한국 청년들의 창의성과 리더십입니다.' },
      { title: '자연과 사계절', desc: '뚜렷한 사계절과 산, 바다가 어우러진 한국의 자연 환경입니다.' },
      { title: '명절과 세시풍속', desc: '설날, 추석 등 계절과 함께하는 한국의 전통 명절과 풍습입니다.' },
      { title: '태권도', desc: '한국에서 만들어진 무술로, 예의와 정신 수양을 함께 강조합니다.' },
      { title: '도시와 대중교통', desc: '지하철과 버스가 촘촘히 연결된 편리하고 안전한 한국의 대중교통입니다.' },
      { title: '서울의 도시 풍경', desc: '고층 빌딩과 궁궐이 공존하는 서울의 독특한 도시 경관입니다.' },
      { title: '편의점 문화', desc: '24시간 운영되는 편의점은 한국인의 일상에서 빼놓을 수 없는 공간입니다.' },
      { title: '병역 제도', desc: '성인 남성이 일정 기간 군 복무를 하는 한국의 독특한 사회 제도입니다.' },
      { title: 'e스포츠와 게임 문화', desc: '한국은 e스포츠 종주국으로 불릴 만큼 게임 산업과 프로게이머 문화가 발달했습니다.' },
      { title: '정(情) 문화', desc: '정(情)은 사람 사이의 깊은 유대감을 뜻하는 한국인 고유의 정서입니다.' },
    ],
    galleryTitle: '갤러리',
    gallerySub: '활동 사진과 영상은 이곳에 채워집니다',
    galleryNote: '실제 사진·영상은 활동이 진행되며 업데이트됩니다.',
    galleryLikes: '좋아요',
    galleryComment: '댓글',
    galleryShare: '공유',
    galleryCaptionPlaceholder: '캡션이 이곳에 표시됩니다.',
    uploadTitle: '팀원 업로드',
    uploadSub: '개인 코드를 입력하면 사진을 올릴 수 있어요',
    uploadCodePlaceholder: '개인 코드 (12자리)',
    uploadLoginBtn: '로그인',
    uploadError: '코드가 일치하지 않습니다',
    uploadedAs: '로 로그인됨',
    uploadBtn: '사진 업로드',
    uploadLogoutBtn: '로그아웃',
    uploadDemoNote: '데모용 기능입니다. 업로드한 사진은 이 브라우저에서만 보이고 저장되지 않습니다.',
    uploadRestrictedNote: '데모 코드: 0001 (실제 서비스에서는 팀원별 개인 코드가 부여됩니다)',
    postedBy: '게시자',
    uploadPageBtn: '업로드하기',
    uploadBackBtn: '← 갤러리로 돌아가기',
    postBtn: '게시하기',
    contactTitle: '연락처',
    contactSub: '문의사항은 아래 채널로 편하게 연락해 주세요.',
    contactEmailLabel: '이메일',
    contactEmailVal: 'hangyp2026@gmail.com',
    contactInstaLabel: '인스타그램',
    contactInstaVal: '@hangyp.2026',
    contactPhoneLabel: '전화번호',
    contactPhoneVal: '010-1234-5678',
    contactKakaoLabel: '카카오톡 오픈채팅',
    contactKakaoVal: 'open.kakao.com/o/gHanGyp2026',
    galleryEmpty: '아직 업로드된 사진이 없습니다.',
    commentPlaceholder: '코멘트를 입력하세요',
    deleteBtn: '삭제',
    phases: [
      {
        title: '발대식 및 사전 교육 1차',
        date: '7월 10~11일',
        desc: '세계시민교육, 글로벌 에티켓 교육, 기참가자와의 대화, 역할 분담 및 계획 수립',
      },
      { title: '2차 사전 교육 (온라인)', date: '8월 9일', desc: '소그룹 토의토론 결과 공유' },
    ],
  },
  en: {
    welcome: 'Welcome to HanGyp',
    gateSub: "Enter the name of the team member printed on your card",
    placeholder: 'Name',
    enterBtn: 'Enter',
    error: 'Code does not match',
    hint: 'Demo code: ONEROOF2026',
    privacyNote: 'Private site · Not indexed by search engines',
    kicker: 'Cultural Diplomacy · 2026',
    heroSub: '2026 Korea–Egypt Youth Exchange Program',
    heroPlaceholder: 'placeholder — cinematic footage: traditional architecture · dancheong · pine trees · magpie · Seoul skyline',
    philosophy: 'Different Cultures, One Roof, One Future',
    philosophySub: 'Young people from different places gather under one roof to shape the future together.',
    comingNextLabel: 'Coming Next',
    soon: 'Soon',
    footerTag: '2026 Korea–Egypt Youth Exchange Program · HanGyp',
    nav: ['Home', 'About', 'Team', 'Timeline', 'Calendar', 'Culture', 'Gallery', 'Contact'],
    calTitle: 'Calendar',
    calSub: '2026 Korea–Egypt Youth Exchange schedule',
    calWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    calMonthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    calYearSuffix: ' 2026',
    calEvents: [
      { month: 6, day: 27, span: 1, label: 'Delegation Selection Interview' },
      { month: 6, day: 29, span: 1, label: 'Final Selection Results' },
      { month: 7, day: 10, span: 2, label: 'Kickoff Ceremony & 1st Preparatory Session' },
      { month: 8, day: 9, span: 1, label: '2nd Preparatory Session (Online)' },
      { month: 8, day: 27, span: 2, label: 'Domestic Exchange Activity' },
      { month: 10, day: 20, span: 1, label: 'Departure Ceremony & 3rd Preparatory Session' },
      { month: 10, day: 21, span: 10, label: 'Dispatch Activity' },
    ],
    teamTitle: 'Team',
    teamSub: 'Select a card to view the full profile',
    teamEmpty: 'Profile coming soon',
    tbd: 'TBD',
    backBtn: '← Back to Team',
    fAge: 'Age',
    fMbti: 'MBTI',
    fInterests: 'Interests',
    fSkill: 'Special skill',
    fFood: 'Favorite food',
    fColor: 'Favorite color',
    fMusic: 'Favorite music/artist/genre',
    fDream: 'Future dream/career goal',
    fMotto: 'Motto',
    fPosition: 'Position',
    fInstagram: 'Instagram',
    fPhone: 'Phone',
    aboutTitle: 'About Us',
    aboutSub: 'Different Cultures, One Roof, One Future',
    aboutMeaningTitle: 'The Meaning Behind Our Name',
    aboutMeaning: [
      { k: 'Han', v: 'Korea' },
      { k: 'Gyp', v: 'Egypt' },
      { k: 'HanGyp (한집)', v: 'One House, One Team' },
    ],
    missionTitle: 'Mission',
    missionText:
      'To bring young people from different cultures together to understand and collaborate directly, building the next generation of friendship between Korea and Egypt.',
    visionTitle: 'Vision',
    visionText:
      'To become a model of exchange where young people gather under one roof, beyond cultural difference, to shape the future together.',
    valuesTitle: 'Core Values',
    values: ['Respect', 'Openness', 'Collaboration', 'Responsibility'],
    whyTitle: 'Why HanGyp?',
    whyText:
      'HanGyp is the Korean youth delegation to the 2026 Korea–Egypt Youth Exchange Program. Coming from different places, we gather under one roof to share culture and shape the future together.',
    timelineTitle: 'Timeline',
    timeline: [
      { label: 'Recruitment & Applications', desc: 'We recruited participants nationwide and received applications from youth across the country.' },
      { label: 'Document & Interview Selection', desc: 'Final participants were selected through document review and interviews.' },
      { label: 'Team Launch Ceremony', desc: 'The selected members gathered together for the official launch of the team.' },
      { label: 'Preparatory Meeting (Online)', desc: 'We met online to get to know each other and prepare for the program.' },
      { label: 'Preparatory Meeting (Offline)', desc: 'We met in person for hands-on practice and discussion to prepare for the exchange.' },
    ],
    journeyTitle: 'Timeline',
    journeySub: 'From the launch ceremony to the day we meet',
    journeyNote: 'Real photos, videos, and reflections will be added as activities take place.',
    cultureTitle: 'Culture',
    cultureSub: '20 sides of Korea we want Egyptian youth to know',
    cultureBackBtn: '← Back to Culture',
    culture: [
      { title: 'Hangul', desc: "Korea's own phonetic alphabet, created by King Sejong, known for being easy to learn and scientifically designed." },
      { title: 'Hanbok', desc: "Korea's traditional clothing, valued for its graceful curves and harmony of color." },
      { title: 'Food Culture', desc: 'Korean dining centers on shared side dishes with rice, and a long tradition of fermented foods.' },
      { title: 'Traditional Architecture', desc: "Hanok houses and ondol floor heating reflect Korea's architecture in harmony with nature." },
      { title: 'Dancheong', desc: 'Five-color patterns painted on traditional buildings that protect the wood and signal status.' },
      { title: 'Tea Culture', desc: 'A traditional practice of tea ceremony used to calm the mind and welcome guests.' },
      { title: 'School Life', desc: 'Clubs, school meals, and field trips are part of everyday life for Korean students.' },
      { title: 'Education Culture', desc: 'A strong emphasis on education and college entrance exams shapes much of Korean society.' },
      { title: 'Technology & Semiconductors', desc: "World-leading semiconductor and IT industries drive much of Korea's economy." },
      { title: 'K-pop & Pop Culture', desc: 'Music, dramas, and film connect Korea with young people around the world.' },
      { title: 'Youth Leadership & Innovation', desc: 'Korean youth are known for creativity and a willingness to take on new challenges.' },
      { title: 'Nature & Four Seasons', desc: "Korea's distinct four seasons, mountains, and coastlines shape its natural landscape." },
      { title: 'Holidays & Traditions', desc: 'Seollal, Chuseok, and other traditional Korean holidays tied to the changing seasons.' },
      { title: 'Taekwondo', desc: 'A martial art that originated in Korea, emphasizing both discipline and respect.' },
      { title: 'Cities & Public Transit', desc: "Korea's dense, convenient subway and bus networks connect cities safely." },
      { title: 'Seoul Cityscape', desc: "Skyscrapers and centuries-old palaces stand side by side in Seoul's distinct skyline." },
      { title: 'Convenience Store Culture', desc: '24-hour convenience stores are an essential part of everyday life in Korea.' },
      { title: 'Military Service', desc: 'A unique system requiring able-bodied men to serve in the military for a set period.' },
      { title: 'Esports & Gaming Culture', desc: 'Korea is often called the birthplace of esports, with a thriving gaming industry and pro-gamer culture.' },
      { title: 'Jeong (정)', desc: 'Jeong is a uniquely Korean sense of deep emotional bond between people.' },
    ],
    galleryTitle: 'Gallery',
    gallerySub: 'Photos and videos from our activities will appear here',
    galleryNote: 'Real photos and videos will be added as activities take place.',
    galleryLikes: 'Like',
    galleryComment: 'Comment',
    galleryShare: 'Share',
    galleryCaptionPlaceholder: 'Caption will appear here.',
    uploadTitle: 'Team Upload',
    uploadSub: 'Enter your personal code to upload a photo',
    uploadCodePlaceholder: 'Personal code (12 characters)',
    uploadLoginBtn: 'Log in',
    uploadError: 'Code does not match',
    uploadedAs: 'Logged in as',
    uploadBtn: 'Upload photo',
    uploadLogoutBtn: 'Log out',
    uploadDemoNote: 'Demo feature only. Uploaded photos are visible in this browser only and are not saved.',
    uploadRestrictedNote: 'Demo code: 0001 (in production, each member would get their own code)',
    postedBy: 'Posted by',
    uploadPageBtn: 'Upload Photo',
    uploadBackBtn: '← Back to Gallery',
    postBtn: 'Post',
    contactTitle: 'Contact',
    contactSub: 'Feel free to reach out through any of the channels below.',
    contactEmailLabel: 'Email',
    contactEmailVal: 'hangyp2026@gmail.com',
    contactInstaLabel: 'Instagram',
    contactInstaVal: '@hangyp.2026',
    contactPhoneLabel: 'Phone',
    contactPhoneVal: '+82 10-1234-5678',
    contactKakaoLabel: 'KakaoTalk Open Chat',
    contactKakaoVal: 'open.kakao.com/o/gHanGyp2026',
    galleryEmpty: 'No photos uploaded yet.',
    commentPlaceholder: 'Add a comment',
    deleteBtn: 'Delete',
    phases: [
      {
        title: 'Kickoff Ceremony & 1st Preparatory Session',
        date: 'Jul 10–11',
        desc: 'Global citizenship education, global etiquette training, conversation with past participants, role assignment and planning',
      },
      { title: '2nd Preparatory Session (Online)', date: 'Aug 9', desc: 'Sharing small-group discussion results' },
    ],
  },
  ar: {
    welcome: 'مرحبًا بكم في HanGyp',
    gateSub: 'أدخل اسم عضو الفريق المطبوع على بطاقتك',
    placeholder: 'الاسم',
    enterBtn: 'دخول',
    error: 'الرمز غير مطابق',
    hint: 'الرمز التجريبي: ONEROOF2026',
    privacyNote: 'موقع خاص · غير مفهرس في محركات البحث',
    kicker: 'الدبلوماسية الثقافية · 2026',
    heroSub: 'برنامج تبادل الشباب الكوري المصري 2026',
    heroPlaceholder: 'عنصر نائب — لقطات سينمائية: العمارة التقليدية · دانتشيونغ · أشجار الصنوبر · العقعق · أفق سيول',
    philosophy: 'ثقافات مختلفة، سقف واحد، مستقبل واحد',
    philosophySub: 'يجتمع شباب من أماكن مختلفة تحت سقف واحد لبناء المستقبل معًا.',
    comingNextLabel: 'الصفحات القادمة',
    soon: 'قريبًا',
    footerTag: '2026 Korea–Egypt Youth Exchange Program · HanGyp',
    nav: ['الرئيسية', 'من نحن', 'الفريق', 'الجدول الزمني', 'التقويم', 'الثقافة', 'المعرض', 'اتصل بنا'],
    calTitle: 'التقويم',
    calSub: 'جدول التبادل الشبابي الكوري المصري 2026',
    calWeek: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    calMonthNames: [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
    ],
    calYearSuffix: ' 2026',
    calEvents: [
      { month: 6, day: 27, span: 1, label: 'مقابلة اختيار الوفد' },
      { month: 6, day: 29, span: 1, label: 'نتائج الاختيار النهائية' },
      { month: 7, day: 10, span: 2, label: 'حفل الانطلاق والتدريب التحضيري الأول' },
      { month: 8, day: 9, span: 1, label: 'التدريب التحضيري الثاني (عبر الإنترنت)' },
      { month: 8, day: 27, span: 2, label: 'نشاط التبادل المحلي' },
      { month: 10, day: 20, span: 1, label: 'حفل التوديع والتدريب التحضيري الثالث' },
      { month: 10, day: 21, span: 10, label: 'نشاط الإيفاد' },
    ],
    teamTitle: 'الفريق',
    teamSub: 'اختر بطاقة لعرض الملف الكامل',
    teamEmpty: 'الملف الشخصي قريبًا',
    tbd: 'قريبًا',
    backBtn: '← العودة إلى الفريق',
    fAge: 'العمر',
    fMbti: 'MBTI',
    fInterests: 'الاهتمامات',
    fSkill: 'مهارة خاصة',
    fFood: 'الطعام المفضل',
    fColor: 'اللون المفضل',
    fMusic: 'الموسيقى/الفنان/النوع المفضل',
    fDream: 'الحلم/الهدف المستقبلي',
    fMotto: 'الشعار',
    fPosition: 'المنصب',
    fInstagram: 'إنستغرام',
    fPhone: 'الهاتف',
    aboutTitle: 'من نحن',
    aboutSub: 'ثقافات مختلفة، سقف واحد، مستقبل واحد',
    aboutMeaningTitle: 'المعنى وراء اسمنا',
    aboutMeaning: [
      { k: 'Han', v: 'كوريا' },
      { k: 'Gyp', v: 'مصر' },
      { k: 'HanGyp (한집)', v: 'بيت واحد، فريق واحد' },
    ],
    missionTitle: 'المهمة',
    missionText: 'الجمع بين شباب من ثقافات مختلفة للتفاهم والتعاون المباشر، وبناء جيل جديد من الصداقة بين كوريا ومصر.',
    visionTitle: 'الرؤية',
    visionText: 'أن نصبح نموذجًا للتبادل يجتمع فيه الشباب تحت سقف واحد، متجاوزين الاختلاف الثقافي، لبناء المستقبل معًا.',
    valuesTitle: 'القيم الأساسية',
    values: ['الاحترام', 'الانفتاح', 'التعاون', 'المسؤولية'],
    whyTitle: 'لماذا HanGyp؟',
    whyText:
      'HanGyp هو وفد الشباب الكوري في برنامج تبادل الشباب الكوري المصري 2026. قادمون من أماكن مختلفة، نجتمع تحت سقف واحد لمشاركة الثقافة وبناء المستقبل معًا.',
    timelineTitle: 'الجدول الزمني',
    timeline: [
      { label: 'التقديم والتسجيل', desc: 'قمنا بتجنيد المشاركين على مستوى البلاد واستلمنا طلبات التقديم من الشباب.' },
      { label: 'الاختيار عبر المستندات والمقابلات', desc: 'تم اختيار المشاركين النهائيين من خلال مراجعة المستندات والمقابلات.' },
      { label: 'حفل انطلاق الفريق', desc: 'اجتمع الأعضاء المختارون معًا للانطلاق الرسمي للفريق.' },
      { label: 'اجتماع تحضيري (عبر الإنترنت)', desc: 'التقينا عبر الإنترنت للتعارف والاستعداد للبرنامج.' },
      { label: 'اجتماع تحضيري (حضوري)', desc: 'التقينا حضوريًا للتدريب العملي والنقاش استعدادًا للتبادل.' },
    ],
    journeyTitle: 'الجدول الزمني',
    journeySub: 'من حفل الانطلاق إلى يوم اللقاء',
    journeyNote: 'ستُضاف الصور ومقاطع الفيديو والانطباعات الحقيقية مع تقدّم الأنشطة.',
    cultureTitle: 'الثقافة',
    cultureSub: '20 جانبًا من كوريا نودّ أن يتعرف عليها شباب مصر',
    cultureBackBtn: '← العودة إلى الثقافة',
    culture: [
      { title: 'الهانغل', desc: 'الأبجدية الصوتية الخاصة بكوريا، ابتكرها الملك سيجونغ، وتشتهر بسهولة تعلمها وتصميمها العلمي.' },
      { title: 'الهانبوك', desc: 'الزي التقليدي الكوري، يتميز بجمال خطوطه المنحنية وتناغم ألوانه.' },
      { title: 'ثقافة الطعام', desc: 'تعتمد الموائد الكورية على مشاركة الأطباق الجانبية مع الأرز، وتقليد عريق في الأطعمة المخمّرة.' },
      { title: 'العمارة التقليدية', desc: 'منازل الهانوك وتدفئة الأونـدول الأرضية تعكس عمارة كورية منسجمة مع الطبيعة.' },
      { title: 'دانتشيونغ', desc: 'زخارف بخمسة ألوان تُرسم على المباني التقليدية لحماية الخشب والدلالة على المكانة.' },
      { title: 'ثقافة الشاي', desc: 'تقليد مراسم الشاي الذي يُستخدم لتهدئة النفس واستقبال الضيوف.' },
      { title: 'الحياة المدرسية', desc: 'الأندية ووجبات المدرسة والرحلات الميدانية جزء من الحياة اليومية للطلاب الكوريين.' },
      { title: 'ثقافة التعليم', desc: 'يشكّل الاهتمام الكبير بالتعليم وامتحانات القبول الجامعي جزءًا كبيرًا من المجتمع الكوري.' },
      { title: 'التكنولوجيا وأشباه الموصلات', desc: 'تقود صناعات أشباه الموصلات وتقنية المعلومات الرائدة عالميًا جزءًا كبيرًا من اقتصاد كوريا.' },
      { title: 'K-pop والثقافة الشعبية', desc: 'تربط الموسيقى والمسلسلات والأفلام كوريا بالشباب حول العالم.' },
      { title: 'قيادة الشباب والابتكار', desc: 'يُعرف الشباب الكوري بالإبداع والاستعداد لخوض تحديات جديدة.' },
      { title: 'الطبيعة والفصول الأربعة', desc: 'تشكّل الفصول الأربعة الواضحة والجبال والسواحل ملامح الطبيعة الكورية.' },
      { title: 'الأعياد والتقاليد', desc: 'أعياد كورية تقليدية مثل سولّال وتشوسوك، مرتبطة بتغيّر الفصول.' },
      { title: 'التايكوندو', desc: 'فن قتالي نشأ في كوريا، يجمع بين الانضباط واحترام الآخرين.' },
      { title: 'المدن والنقل العام', desc: 'شبكات مترو وحافلات كثيفة ومريحة تربط المدن الكورية بأمان.' },
      { title: 'المشهد الحضري لسيول', desc: 'ناطحات السحاب والقصور العريقة تتجاور في أفق سيول المميز.' },
      { title: 'ثقافة المتاجر المفتوحة على مدار الساعة', desc: 'تُعد المتاجر المفتوحة 24 ساعة جزءًا أساسيًا من الحياة اليومية في كوريا.' },
      { title: 'الخدمة العسكرية', desc: 'نظام كوري فريد يُلزم الرجال الأصحاء بالخدمة العسكرية لفترة محددة.' },
      { title: 'الرياضات الإلكترونية وثقافة الألعاب', desc: 'غالبًا ما تُوصف كوريا بمهد الرياضات الإلكترونية، بصناعة ألعاب مزدهرة وثقافة لاعبين محترفين.' },
      { title: 'جيونغ (정)', desc: 'جيونغ مفهوم كوري فريد يعبّر عن الرابط العاطفي العميق بين الناس.' },
    ],
    galleryTitle: 'المعرض',
    gallerySub: 'ستظهر هنا صور ومقاطع فيديو من أنشطتنا',
    galleryNote: 'ستُضاف الصور ومقاطع الفيديو الحقيقية مع تقدّم الأنشطة.',
    galleryLikes: 'إعجاب',
    galleryComment: 'تعليق',
    galleryShare: 'مشاركة',
    galleryCaptionPlaceholder: 'سيظهر الوصف هنا.',
    uploadTitle: 'رفع الفريق',
    uploadSub: 'أدخل رمزك الشخصي لرفع صورة',
    uploadCodePlaceholder: 'الرمز الشخصي (12 حرفًا)',
    uploadLoginBtn: 'تسجيل الدخول',
    uploadError: 'الرمز غير مطابق',
    uploadedAs: 'مسجّل الدخول باسم',
    uploadBtn: 'رفع صورة',
    uploadLogoutBtn: 'تسجيل الخروج',
    uploadDemoNote: 'ميزة تجريبية فقط. الصور المرفوعة تظهر في هذا المتصفح فقط ولا يتم حفظها.',
    uploadRestrictedNote: 'رمز تجريبي: 0001 (في الإصدار الفعلي سيكون لكل عضو رمزه الخاص)',
    postedBy: 'نشرها',
    uploadPageBtn: 'رفع صورة',
    uploadBackBtn: '← العودة إلى المعرض',
    postBtn: 'نشر',
    contactTitle: 'اتصل بنا',
    contactSub: 'يسعدنا تواصلكم معنا عبر القنوات التالية.',
    contactEmailLabel: 'البريد الإلكتروني',
    contactEmailVal: 'hangyp2026@gmail.com',
    contactInstaLabel: 'إنستغرام',
    contactInstaVal: '@hangyp.2026',
    contactPhoneLabel: 'الهاتف',
    contactPhoneVal: '+82 10-1234-5678',
    contactKakaoLabel: 'محادثة كاكاو المفتوحة',
    contactKakaoVal: 'open.kakao.com/o/gHanGyp2026',
    galleryEmpty: 'لا توجد صور مرفوعة بعد.',
    commentPlaceholder: 'أضف تعليقًا',
    deleteBtn: 'حذف',
    phases: [
      {
        title: 'حفل الانطلاق والتدريب التحضيري الأول',
        date: '10–11 يوليو',
        desc: 'تعليم المواطنة العالمية، تدريب على آداب السلوك العالمية، حوار مع المشاركين السابقين، توزيع الأدوار ووضع الخطط',
      },
      { title: 'التدريب التحضيري الثاني (عبر الإنترنت)', date: '9 أغسطس', desc: 'مشاركة نتائج نقاش المجموعات الصغيرة' },
    ],
  },
};

export const BODY_FONT: Record<Lang, string> = {
  ko: "'Pretendard','Pretendard Variable','Noto Sans KR',-apple-system,sans-serif",
  en: "'Pretendard','Pretendard Variable','Noto Sans KR',-apple-system,sans-serif",
  ar: "'IBM Plex Sans Arabic','Tahoma',sans-serif",
};

export function dirFor(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
