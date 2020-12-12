require "pathname"

BUILD_DIR = Pathname("build")
LOCALE_DIR = Pathname("trans")
TRANS_DIR = Pathname("translate")
PSEUDO_LANG = "ach"

CROWDIN_SNIPPET = <<EOS

    <script type="text/javascript">
      var _jipt = [];
      _jipt.push(['project', 'joinplume']);
      _jipt.push(['escape', function() {
        window.location.href = 'https://joinplu.me';
      }]);
    </script>
    <script type="text/javascript" src="//cdn.crowdin.com/jipt/jipt.js"></script>
EOS

class Pathname
  alias to_str to_s
end

task :default => [:build_trans, :build_site]

desc "Build site"
task :build_site => [:build_base, "crowdin:download"] do
  Pathname.glob("#{LOCALE_DIR}/**/*.html").select(&:file?).each do |path|
    content = path.read
    content.sub! /<script type="text\/javascript" src="\/\/cdn.crowdin.com\/jipt\/jipt.js"><\/script>/, ""
    dest = Pathname(path.to_path.sub(LOCALE_DIR, BUILD_DIR))
    next if dest.file?
    $stderr.puts "copy #{path} -> #{dest}"
    dest.parent.mkpath
    dest.write content
  end
end

task :build_base do
  sh "middleman", "build"
end

desc "Build site for translate.joinplu.me"
task :build_trans => "crowdin:download_pseudo" do
  sh "middleman", "build", "--build-dir", TRANS_DIR

  (LOCALE_DIR/PSEUDO_LANG).glob("**/*.html").each do |html|
    doc = html.read
    doc.sub! "<head>", "<head>" + CROWDIN_SNIPPET
    dest = Pathname(html.to_path.sub(LOCALE_DIR/PSEUDO_LANG, TRANS_DIR))
    dest.write doc
  end
end

task :build_trans_src do
  sh "middleman", "build", "--build-dir", LOCALE_DIR
end

desc "Deploy joinplue.me"
task :deploy => :build_site do
  sh "netlify", "deploy", "--site", "12885026-8536-4072-b216-04d71e8f84be", "--dir", BUILD_DIR, "--prod"
end

desc "Deploy translate.joinplu.me"
task :deploy_trans => :build_trans do
  sh "netlify", "deploy", "--site", "0812f781-8b3a-481d-b4fb-bc5cb5254f19", "--dir", TRANS_DIR, "--prod"
end

namespace :crowdin do
  desc "Download translations"
  task :download => :build_trans_src do
    sh "crowdin", "download"
  end

  desc "Upload translation sources"
  task :upload => :build_trans_src do
    sh "crowdin", "upload", "sources"
  end

  task :download_pseudo do
    sh "crowdin", "download", "--pseudo"
  end
end
